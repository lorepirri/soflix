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
  <Row>
    <Col xs={12} sm={4}>
      <Form.Control
        className="mb-5"
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
      />
    </Col>
  </Row>);
}

export default connect( null, { setFilter })(VisibilityFilterInput);