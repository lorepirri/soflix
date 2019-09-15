import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// get fontawesome imports
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import app components
import { StarButton } from '../star-button/star-button';

// imports for files to bundle
import './header.scss';

const LOGIN_PATH = '/login';
const REGISTRATION_PATH = '/register';
const MOVIE_PATH = '/movies/:movieId';
const GENRE_PATH = '/genres/:genreName';
const DIRECTOR_PATH = '/directors/:directorName';
const PROFILE_PATH = '/profile';

function ActionPanelNoUser(props) {
  return (
    <Form inline className="my-4 my-sm-0 d-flex justify-content-center justify-content-sm-end">
      <Link to={LOGIN_PATH}>
        <Button 
          variant="outline-secondary" 
          className="mr-2 mr-sm-2">Log in</Button>
      </Link>      
      <span className="mr-2 mr-sm-2">or</span>
      <Link to={REGISTRATION_PATH}>
        <Button variant="primary">Sign up</Button>
      </Link>      
    </Form>
  );
}

function ActionPanelUser(props) {
  const { user, onLoggedIn } = props;
  return (
    <Form inline className="my-4 my-sm-0 d-flex justify-content-center justify-content-sm-end">
      <Navbar.Text>
        Signed in as: <Link to={PROFILE_PATH}>{user}</Link>
      </Navbar.Text>        
      <Button 
        variant="outline-primary" 
        className="ml-3 ml-sm-4"
        onClick={() => onLoggedIn(null)}>Log out</Button>
    </Form>
  );
}


export function Header(props) {
  // vars
  const { match, movie, genre, user, director, onLoggedIn } = props;
  const { userProfile, onToggleFavourite } = props;
  // if not inside a Route, force path to '/'
  const { path } = match || { path: '/'};
  // check if movies are loaded, if any of these, then not
  let isReady = !(!match && !movie && !user);
  // shows the action panel or not (log in / log out buttons)
  let showActionPanel = true;
  // registration, login, or profile view, do no need action panel
  let isUserAction = false;
  // title of the nav bar
  let navTitle = 'SoFlix';
  // is it a movie?
  let isMovie = false;
  // is it the home page?
  let isHome = false;
  // in case it is a movie, is it starred?
  let isFavorite = false;

  // check if user is logged in
  if (path === LOGIN_PATH ) {
    // a log in was requested
    navTitle = 'Log in to SoFlix';
    isUserAction = true;
  } else if (path === REGISTRATION_PATH ) {
    // a sign up was requested
    navTitle = 'Register to SoFlix';
    isUserAction = true;
  } else if (path === GENRE_PATH ) {
    navTitle = genre.Name;
  } else if (path === MOVIE_PATH ) {
    isMovie = true;
    isFavorite = user && userProfile.FavoriteMovies.includes(movie._id);
    navTitle = movie.Title;
  } else if (path === DIRECTOR_PATH ) {
    navTitle = director.Name;
  } else if (path === PROFILE_PATH ) {
    if (user) {
      // when a user unregisters, 'user' is null for a moment
      navTitle = `Profile of ${user}`;
    }
    isUserAction = true;
  } else if (path === '/' ) {
    isHome = true;
  }

  showActionPanel = !isUserAction && isReady;

  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
      <Navbar.Brand className="mw-80 mw-sm-100 text-truncate">
        {!isHome
          ?
          <React.Fragment>
          <a href="#" onClick={(e) => {window.open('/', '_self'); /*props.history.goBack();*/ e.preventDefault();}}>
          <FontAwesomeIcon 
            icon={faChevronLeft}
            className="mr-2 mr-sm-4"
            />
          </a>
          </React.Fragment>
          : <FontAwesomeIcon 
          icon={faChevronLeft}
          className="mr-2 mr-sm-4 text-light"
          />}
        
        {navTitle}

      </Navbar.Brand>
      {showActionPanel &&
        <React.Fragment>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {(isMovie && user) &&
              <StarButton 
                movieId={movie._id}
                isFavorite={isFavorite}
                onToggleFavourite={movieId => onToggleFavourite(movieId)}
                className="ml-2 ml-sm-4" />
            }
          </Nav>
          {user 
            ? <ActionPanelUser user={user} onLoggedIn={user => onLoggedIn(user)} />
            : <ActionPanelNoUser />
          }
          </Navbar.Collapse>
        </React.Fragment>        
      }
    </Navbar>
  );


};

Header.propTypes = {
  user: PropTypes.string,
  movie: PropTypes.object,
  onLoggedIn: PropTypes.func.isRequired,
  onToggleFavourite: PropTypes.func.isRequired
};

ActionPanelNoUser.propTypes = {
};

ActionPanelUser.propTypes = {
  user: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};
