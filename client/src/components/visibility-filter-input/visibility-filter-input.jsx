import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// get bootstrap imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form.Control 
      className="mb-3"
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="filter"
    />
  );
}

export default connect( null, { setFilter })(VisibilityFilterInput);