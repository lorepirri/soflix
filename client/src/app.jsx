import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import axios from 'axios';

import { Route, Switch } from 'react-router-dom';
import { Router } from "react-router";
import { createBrowserHistory } from "history";
const history = createBrowserHistory(); 

// imports for files to bundle
import './app.scss';

// import bootstrap components
import Container from 'react-bootstrap/Container';

// import app components
import { Header } from './components/header/header';
import { MainView } from './components/main-view/main-view';
import { LoginView } from './components/login-view/login-view';
import { RegistrationView } from './components/registration-view/registration-view';
import { MovieView } from './components/movie-view/movie-view';

// some constants
const REGISTER_NEW_USER = 'registerNewUser';
const LOGIN_USER = 'login';

const DefaultLayout = ({component: Component, ...rest}) => {
  const { history, match, user, movie, onLoggedIn } = {...rest};

  return (
    <React.Fragment>
      <Header history={history} match={match} user={user} movie={movie} onLoggedIn={onLoggedIn} />
      <Container className="mt-5">
        <Component {...rest} />
      </Container>
    </React.Fragment> 
  );
};

const DefaultLayoutRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <DefaultLayout component={Component} {...matchProps} {...rest} />
    )} />
  )
};

// main component
class App extends React.Component {

  constructor() {
    // super class constructor
    super();

    // init an empty state
    this.state = { 
      movies: null,
      user: null
    };
  }

  componentDidMount() {

    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
    }
    this.getMovies(accessToken);
  }

  getMovies(token) {
    // const url_root = 'http://localhost:3000'
    const url_root = 'https://soflix.herokuapp.com'
    const movies_url = `${url_root}/movies`;
    let options = {}
    if (token) {
      options = {
        headers: { Authorization: `Bearer ${token}`}
      }
    }
    axios.get(movies_url, options)
      .then( res => {
        // update the state
        this.setState({
          movies: res.data
        })
      })
      .catch( err => {
        console.error(err);
      });
  }

  onLoggedIn(authData) {
    let user = null;
    if (authData) {
      user = authData.user.Username;
    }
    this.setState({
      user
    });
    if (user) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    window.open('/', '_self');
  }

  onNewUserRegistered(user) {
    this.setState({
      user
    });
  }

  render() {
    const { user, movies } = this.state;

    if (!movies) {
      return (<DefaultLayout component={MainView} onLoggedIn={user => this.onLoggedIn(user)} />);
    }

    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/movies/:movieId"
            render={(matchProps) => <DefaultLayout {...matchProps} component={MovieView} user={user} movie={movies.find(m => m._id === matchProps.match.params.movieId)} onLoggedIn={user => this.onLoggedIn(user)} />}/>
          <DefaultLayoutRoute 
            path="/login"
            user={user}
            component={LoginView} onLoggedIn={user => this.onLoggedIn(user)} />
          <DefaultLayoutRoute 
            path="/register"
            user={user}
            component={RegistrationView}
            onLoggedIn={user => this.onLoggedIn(user)}
            onNewUserRegistered={user => this.onNewUserRegistered(user)} />
          <DefaultLayoutRoute 
            exact path="/"
            user={user}
            component={MainView} movies={movies}
            onLoggedIn={user => this.onLoggedIn(user)} />
      </Switch>
      </Router>
    );
    //   <Route exact path="/genres/:name" render={/* genre view*/}/>
    //   <Route exact path="/directors/:name" render={/* director view */}/>

{/* <Route path="/directors/:name" render={({ match }) => {
  if (!movies) return <div className="main-view"/>;
  return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
} /> */}


  }
}

export default App;

DefaultLayout.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};

DefaultLayoutRoute.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
