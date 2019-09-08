import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// get fontawesome imports
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// imports for files to bundle
import './header.scss';

const LOGIN_PATH = '/login';
const REGISTRATION_PATH = '/register';
const MOVIE_PATH = '/movies/:movieId';


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
        Signed in as: <a href="#profile">{user}</a>
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
  const { match, movie, user, onLoggedIn } = props;
  // if not inside a Route, force path to '/'
  const { path } = match || { path: '/'};
  // check if movies are loaded, if any of these, then not
  let isReady = !(!match && !movie && !user);
  
  console.log(isReady);
  console.log(match);
  console.log(movie);
  console.log(user);

  let showActionPanel = true;
  let isLoginOrRegistration = false;
  let navTitle = 'SoFlix';
  // check if user is logged in
  if (!user) {
    if (path === LOGIN_PATH ) {
      // a log in was requested
      navTitle = 'Log in to SoFlix';
      isLoginOrRegistration = true;
    } else if (path === REGISTRATION_PATH ) {
      // a sign up was requested
      navTitle = 'Register to SoFlix';
      isLoginOrRegistration = true;
    }
  }
  showActionPanel = !isLoginOrRegistration && isReady;
  const isMovie = (path === MOVIE_PATH)
  if (isMovie) {
    navTitle = movie.Title;
  }

  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
      <Navbar.Brand className="mw-80 mw-sm-100 text-truncate">
        {isMovie || isLoginOrRegistration 
          ?
          <React.Fragment>
          <a href="#" onClick={(e) => {props.history.goBack(); e.preventDefault();}}>
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
            {(isMovie && user && !isLoginOrRegistration) &&
              <FontAwesomeIcon icon={faStar} className="ml-2 ml-sm-4" />
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
  onLoggedIn: PropTypes.func.isRequired
};

ActionPanelNoUser.propTypes = {
};

ActionPanelUser.propTypes = {
  user: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};
