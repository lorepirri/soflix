import React from 'react';
import ReactDOM from 'react-dom';

// imports for files to bundle
import './index.scss';

import App from './app.jsx';

// main component
class SoFlixApplication extends React.Component {
  render() {
    return (<App /> );
  }
}

// root element of the app
const container = document.getElementsByClassName('app-container')[0];

// set app root DOM element
ReactDOM.render(React.createElement(SoFlixApplication), container);
