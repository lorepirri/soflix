import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// get bootstrap imports
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { setSortFilter } from '../../actions/actions';

function SortFilterDropdown(props) {
  const { sortFilter } = props;
  let dropdownTitle = 'Sort by';
  if (sortFilter && sortFilter !== '') {
    dropdownTitle = `Sort by ${sortFilter}`;
  }
  return (
    <ButtonToolbar>
      <DropdownButton
        variant="outline-secondary"
        title={dropdownTitle}
        onSelect={(eventKey) => { props.setSortFilter(eventKey);}}
      >
        <Dropdown.Item eventKey=''>None</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="Movie Title">Movie Title</Dropdown.Item>
      </DropdownButton>
  </ButtonToolbar>    
 
  );
}

export default connect( null, { setSortFilter })(SortFilterDropdown);