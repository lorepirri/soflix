import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// imports for files to bundle
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ validated, setValidated] = useState(false);

  const handleSubmit = (e) => {

    e.preventDefault();

    // handles form validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('new login', username, 'with password', password);
      // send a request to the server for authentication
      const login_url = 'https://soflix.herokuapp.com/login';
      axios.post(login_url, {
        Username: username,
        Password: password
      })
        .then( res => {
          const authData = res.data;
          props.onLoggedIn(authData);
        })
        .catch( err => {
          console.error(`User <${username}> not found.`);
        });
    }
    // notify that fields were validated,
    // therefore feedback can be shown
    // (otherwise it will appear at page load)
    setValidated(true);
  };

  return (
    <div className="login-view">
      <Row className="justify-content-center">
        <Col xs={11} sm={8} md={6} className="form-container">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                value={username}
                onChange={ e => setUsername(e.target.value)}      
                required
                placeholder="Enter username" />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>            
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                value={password}
                onChange={ e => setPassword(e.target.value)}
                required              
                placeholder="Password" />
              <Form.Control.Feedback type="invalid">
                Please insert your password.
              </Form.Control.Feedback>                
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};