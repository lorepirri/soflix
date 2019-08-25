import React from 'react';
import ReactDOM from 'react-dom';

// imports for files to bundle
import './index.scss';

// main component
class SoFlixApplication extends React.Component {
  render() {
    return (
      <div className="soflix">
        <div>Hello world!!!</div>
      </div>
    );
  }
}

// root element of the app
const container = document.getElementsByClassName('app-container')[0];

// set app root DOM element
ReactDOM.render(React.createElement(SoFlixApplication), container);
