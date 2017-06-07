import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';

import reducers from './reducers';
import Routes from './Routes';

export default class App extends Component {

  componentWillMount() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        apiKey: 'AIzaSyB9e3MwQRVYZHhTrw9l7s2IFAVwq2WJAAQ',
        authDomain: 'teste-612a5.firebaseapp.com',
        databaseURL: 'https://teste-612a5.firebaseio.com',
        projectId: 'teste-612a5',
        storageBucket: 'teste-612a5.appspot.com',
        messagingSenderId: '269161192776'
      });
    }
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}
