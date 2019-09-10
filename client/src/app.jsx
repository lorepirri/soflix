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
import { GenreView } from './components/genre-view/genre-view';
import { DirectorView } from './components/director-view/director-view';
import { ProfileView } from './components/profile-view/profile-view';


const DefaultLayout = ({component: Component, ...rest}) => {

  return (
    <React.Fragment>
      <Header {...rest} />
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
      user: null,
      userProfile: null
    };
  }

  componentDidMount() {

    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      let userProfileString = localStorage.getItem('user-profile');
      let userProfile = JSON.parse(userProfileString);
      this.setState({
        user: localStorage.getItem('user'),
        userProfile
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
    let userProfile = null;
    if (authData) {
      user = authData.user.Username;
      userProfile = authData.user;
    }
    this.setState({
      user,
      userProfile
    });
    if (user) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      localStorage.setItem('user-profile', JSON.stringify(authData.user));
      this.getMovies(authData.token);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('user-profile');
    }
    window.open('/', '_self');
  }

  onUserUpdate(userProfile) {
    if (userProfile) {
      localStorage.setItem('user-profile', userProfile);
      this.setState({
        userProfile
      });
    }
  }

  render() {
    const { user, userProfile, movies } = this.state;
    
    if (!movies) {
      return (<DefaultLayout component={MainView} onLoggedIn={user => this.onLoggedIn(user)} />);
    }
    console.log('userProfile',userProfile);
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
            onLoggedIn={user => this.onLoggedIn(user)} />
          <DefaultLayoutRoute 
            exact path="/"
            user={user}
            component={MainView} movies={movies}
            onLoggedIn={user => this.onLoggedIn(user)} />
          <Route
            path="/genres/:genreName"
            render={(matchProps) => <DefaultLayout {...matchProps} component={GenreView} user={user} genre={movies.find(m => m.Genre.Name === matchProps.match.params.genreName).Genre} movies={movies.filter(m => m.Genre.Name === matchProps.match.params.genreName)} onLoggedIn={user => this.onLoggedIn(user)} />}/>
          <Route
            path="/directors/:directorName"
            render={(matchProps) => <DefaultLayout {...matchProps} component={DirectorView} user={user} director={movies.find(m => m.Director.Name === matchProps.match.params.directorName).Director} movies={movies.filter(m => m.Director.Name === matchProps.match.params.directorName)} onLoggedIn={user => this.onLoggedIn(user)} />}/>
          <Route
            path="/profile"
            render={(matchProps) => <DefaultLayout {...matchProps} component={ProfileView} user={user} userProfile={userProfile} movies={movies.filter(m => userProfile.FavoriteMovies.includes(m._id))} onLoggedIn={user => this.onLoggedIn(user)} onUserUpdate={userProfile => this.onUserUpdate(userProfile)} />}/>
      </Switch>
      </Router>
    );
  }
}

export default App;

DefaultLayout.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};

DefaultLayoutRoute.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
