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
  const { movies, userProfile } = props;
  const [ name, setName ] = useState(userProfile.Name);
  const [ username, setUsername ] = useState(userProfile.Username);
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState(userProfile.Email);
  const [ birthday, setBirthday ] = useState(userProfile.Birthday);
  const [ validated, setValidated] = useState(false);

  const formField = (label, value, onChange, type='text', feedback) => {
    if (!feedback) {
      feedback = `Please insert your ${label.toLowerCase()}.`;
    }
    return (
      <Form.Group controlId="formBasicUsername">
        <Form.Label>{label}</Form.Label>
        <Form.Control 
          type={type}
          value={value}
          onChange={ e => onChange(e.target.value)}      
          required
          placeholder={`Enter ${label.toLowerCase()}`} />
        <Form.Control.Feedback type="invalid">
          {feedback}
        </Form.Control.Feedback>            
      </Form.Group>
    );
  }

  const handleUpdate = (e) => {

    e.preventDefault();

    // handles form validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('user update', username, 'with password', password);

      const register_url = 'https://soflix.herokuapp.com/users';
      axios.put(register_url, {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
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

    console.log('unregister user', username);

    const unregister_url = `https://soflix.herokuapp.com/users/${username}`;
    axios.delete(unregister_url)
    .then(response => {
      const data = response.data;
      console.log(data);
      props.onLoggedIn(null); // logout the user from the current session
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });      
  };

  return (
    <div className="profile-view">
      <Row className="justify-content-center">
        <Col xs={11} sm={6} md={6}>
          <Form noValidate validated={validated} onSubmit={handleUpdate}>
            {formField('Name', name, setName)}
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control plaintext readOnly defaultValue={username} />
            </Form.Group>
            {formField('Password', password, setPassword, 'password')}
            {formField('Email', email, setEmail, 'email', 'Please provide a valid email address.')}
            {formField('Birthday', birthday, setBirthday, 'date', 'Please provide a valid date (e.g. 01/01/1970).')}

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
        <Col xs={11} sm={6} md={6}>
          <Form noValidate validated={validated} onSubmit={handleUnregister}>
            <Button variant="danger" type="submit">
              Unregister
            </Button>
          </Form>
        </Col>
      </Row>
      <br />
      <MoviesGrid movies={movies} title="My favourite movies" />
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
  onLoggedIn: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired
};