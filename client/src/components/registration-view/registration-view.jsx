import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// imports for files to bundle
import './registration-view.scss';

export function RegistrationView(props) {
  const [ name, setName ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
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

  const handleSubmit = (e) => {

    e.preventDefault();

    // handles form validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('new registration', username, 'with password', password);
      // const url_root = 'http://localhost:3000'
      const url_root = 'https://soflix.herokuapp.com'
      const register_url = `${url_root}/users`;
      axios.post(register_url, {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user', e)
      });      
    }
    // notify that fields were validated,
    // therefore feedback can be shown
    // (otherwise it will appear at page load)
    setValidated(true);
  };

  return (
    <div className="registration-view">
      <Row className="justify-content-center">
        <Col xs={11} sm={8} md={6} className="form-container">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {formField('Name', name, setName)}
            {formField('Username', username, setUsername)}
            {formField('Password', password, setPassword, 'password')}
            {formField('Email', email, setEmail, 'email', 'Please provide a valid email address.')}
            {formField('Birthday', birthday, setBirthday, 'date', 'Please provide a valid date (e.g. 01/01/1970).')}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

RegistrationView.propTypes = {
  // no props so far
};