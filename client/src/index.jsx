import React from 'react';
import ReactDOM from 'react-dom';

// imports for files to bundle
import './index.scss';

// import components
import { MainView } from './components/main-view/main-view';

// main component
class SoFlixApplication extends React.Component {
  render() {
    return (<MainView /> );
  }
}

// root element of the app
const container = document.getElementsByClassName('app-container')[0];

// set app root DOM element
ReactDOM.render(React.createElement(SoFlixApplication), container);
