import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// import app components
import { MoviesGrid } from '../movies-grid/movies-grid';

// imports for files to bundle
import './profile-view.scss';

export function ProfileView(props) {
  const { movies, userProfile, token } = props;

  if (!userProfile) {
    return null;
  }
  
  const { user, onToggleFavourite } = props;

  const [ name, setName ] = useState(userProfile.Name);
  const [ username, setUsername ] = useState(userProfile.Username);
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState(userProfile.Email);
  const [ birthday, setBirthday ] = useState(userProfile.Birthday.substring(0,10));
  const [ validated, setValidated] = useState(false);

  const formField = (label, value, onChange, type='text', feedback, options) => {
    if (!feedback) {
      feedback = `Please insert your ${label.toLowerCase()}.`;
    }
    return (
      <Form.Group controlId={`formBasic${label.trim()}`}>
        <Form.Label>{label}</Form.Label>
        <Form.Control 
          type={type}
          value={value}
          onChange={ e => onChange(e.target.value)}      
          required
          {...options}
          placeholder={`Enter ${label.toLowerCase()}`} />
        <Form.Control.Feedback type="invalid">
          {feedback}
        </Form.Control.Feedback>            
      </Form.Group>
    );
  }

  const handleUpdate = (e) => {

    e.preventDefault();

    if (!token) {
      // if token is not present, user is not logged in, go home
      console.log('user is not logged in');
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      return
    }

    // handles form validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('user update', username, 'with password', password);
      // const url_root = 'http://localhost:3000'
      const url_root = 'https://soflix.herokuapp.com'
      const register_url = `${url_root}/users/${username}`;

      let options = {}
      if (token) {
        options = {
          headers: { Authorization: `Bearer ${token}`}
        }
      }

      axios.put(register_url, {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }, options)
      .then(response => {
        const data = response.data;
        props.onUserUpdate(data)
      })
      .catch(e => {
        console.log('error updating the user')
      });      
    }
    // notify that fields were validated,
    // therefore feedback can be shown
    // (otherwise it will appear at page load)
    setValidated(true);
  };

  const handleUnregister = (e) => {

    e.preventDefault();

    if (!confirm('Do you really want to leave us?')) {
      return;
    }

    if (!token) {
      // if token is not present, user is not logged in, go home
      console.log('user is not logged in');
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      return
    }

    console.log('unregister user', username);
    // const url_root = 'http://localhost:3000'
    const url_root = 'https://soflix.herokuapp.com'
    const unregister_url = `${url_root}/users/${username}`;

    let options = {}
    if (token) {
      options = {
        headers: { Authorization: `Bearer ${token}`}
      }
    }

    axios.delete(unregister_url, options)
    .then(response => {
      const data = response.data;
      props.onLoggedIn(null); // logout the user from the current session
    })
    .catch(e => {
      console.log('error unregistering the user', e)
    });      
  };

  return (
    <div className="profile-view">
      <Row>
        <Col className="mb-5" xs={11} sm={6} md={6}>
          <Form noValidate validated={validated} onSubmit={handleUpdate}>
            {formField('Name', name, setName)}
            {formField('Username', username, setUsername, 'text', '', {readOnly:true, disabled:true, required:false, value: username})}
            {formField('Password', password, setPassword, 'password', 'Please provide a password of at least 6 characters.', {minLength: 6})}
            {formField('Email', email, setEmail, 'email', 'Please provide a valid email address.')}
            {formField('Birthday', birthday, setBirthday, 'date', 'Please provide a valid date (e.g. 01/01/1970).')}

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
        <Col xs={11} sm={6} md={6} className="text-center">
          <Form className="p-3 border border-danger rounded" noValidate validated={validated} onSubmit={handleUnregister}>
            <Form.Label className="mb-3 text-center text-danger">Dangerous Area</Form.Label>
            <br />
            <Button variant="danger" type="submit">
              Unregister
            </Button>
          </Form>
        </Col>
      </Row>
      <br />
      <MoviesGrid 
        movies={movies}
        title="My favourite movies"
        onToggleFavourite={movieId => onToggleFavourite(movieId)}
        user={user}
        userProfile={userProfile}
      />
    </div>
  );
};

ProfileView.propTypes = {
  userProfile: PropTypes.shape({
    _id: PropTypes.string,
    FavoriteMovies: PropTypes.array,
    Name: PropTypes.string,
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.string
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      ImageUrl: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.exact({
        _id: PropTypes.string,
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string
      })    
    })
  ),
  token: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onToggleFavourite: PropTypes.func.isRequired
};