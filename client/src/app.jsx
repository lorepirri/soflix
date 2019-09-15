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
      userProfile: null,
      token: null
    };
  }

  componentDidMount() {

    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      let userProfileString = localStorage.getItem('user-profile');
      let userProfile = JSON.parse(userProfileString);
      this.setState({
        user: localStorage.getItem('user'),
        userProfile,
        token: accessToken
      });
    }
    this.getMovies(accessToken);
  }

  getMovies(token) {
    const url_root = 'http://localhost:3000'
    // const url_root = 'https://soflix.herokuapp.com'
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
    let token = null;
    if (authData) {
      user = authData.user.Username;
      userProfile = authData.user;
      token = authData.token;
    }

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

    this.setState({
      user,
      userProfile,
      token
    });

    window.open('/', '_self');
  }

  onUserUpdate(userProfile, goHome=true) {
    if (userProfile) {
      localStorage.setItem('user-profile', JSON.stringify(userProfile));
      this.setState({
        userProfile
      });
      if (goHome) {
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      }
    }
  }

  onToggleFavourite (movieId) {
    
    const { user: username, userProfile, token } = this.state;

    if (!token) {
      // if token is not present, user is not logged in, go home
      console.log('user is not logged in');
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      return;
    }

    console.log('toggle favorite movie', movieId, 'for user', username);
    
    const url_root = 'http://localhost:3000'
    // const url_root = 'https://soflix.herokuapp.com'
    const favorite_movie_url = `${url_root}/users/${username}/${movieId}`;

    let options = {
      headers: { Authorization: `Bearer ${token}`}
    };
    let axiosAction = (url, options) => axios.post(url, null, options);
    if (userProfile.FavoriteMovies.includes(movieId)) {
      axiosAction = axios.delete;
      console.log('remove from favorites.');
    } else {
      console.log('add to favorites.');
    }

    axiosAction(favorite_movie_url, options)
    .then(response => {
      const newUserProfile = response.data;
      this.onUserUpdate(newUserProfile, false);
    })
    .catch(e => {
      console.log('error toggling the movie as favorite:', e)
    });      
  }

  render() {
    const { user, userProfile, movies, token } = this.state;
    
    // the log in / log out function
    const onLoggedIn = user => this.onLoggedIn(user);
    // toggle star/unstar function
    const onToggleFavourite= movieId => this.onToggleFavourite(movieId);

    // these are propagated through all the routes
    const routeProps = { user, token, onLoggedIn, userProfile, onToggleFavourite };

    // if movies are not yet loaded, return a spinner
    if (!movies) {
      return (<DefaultLayout component={MainView} onLoggedIn={onLoggedIn} />);
    }
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/movies/:movieId"
            render={(matchProps) => <DefaultLayout {...matchProps} {...routeProps} 
                                      component={MovieView} 
                                      movie={movies.find(m => m._id === matchProps.match.params.movieId)}
                                    />}/>
          <DefaultLayoutRoute 
            path="/login" component={LoginView} {...routeProps} />
          <DefaultLayoutRoute 
            path="/register" component={RegistrationView} {...routeProps} />
          <DefaultLayoutRoute 
            exact path="/" component={MainView} {...routeProps} movies={movies} />
          <Route
            path="/genres/:genreName"
            render={(matchProps) => <DefaultLayout {...matchProps} {...routeProps} component={GenreView} genre={movies.find(m => m.Genre.Name === matchProps.match.params.genreName).Genre} movies={movies.filter(m => m.Genre.Name === matchProps.match.params.genreName)} />}/>
          <Route
            path="/directors/:directorName"
            render={(matchProps) => <DefaultLayout {...matchProps} {...routeProps} component={DirectorView} director={movies.find(m => m.Director.Name === matchProps.match.params.directorName).Director} movies={movies.filter(m => m.Director.Name === matchProps.match.params.directorName)} />}/>
          <Route
            path="/profile"
            render={(matchProps) => <DefaultLayout {...matchProps} {...routeProps} component={ProfileView} userProfile={userProfile} movies={movies.filter(m => userProfile && userProfile.FavoriteMovies.includes(m._id))} onUserUpdate={userProfile => this.onUserUpdate(userProfile)} />}/>
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
