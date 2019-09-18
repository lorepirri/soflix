import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import moviesApp from './reducers/reducers';
const store = createStore(moviesApp);

// imports for files to bundle
import './index.scss';

import App from './app.jsx';

// main component
class SoFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

// root element of the app
const container = document.getElementsByClassName('app-container')[0];

// set app root DOM element
ReactDOM.render(React.createElement(SoFlixApplication), container);
