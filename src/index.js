import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

// var firebaseConfig = {
//     apiKey: "AIzaSyAT0u3qWkmAjSc-cPFmB0EfwjAsL5_d3QM",
//     authDomain: "anotherrep.firebaseapp.com",
//     databaseURL: "https://anotherrep.firebaseio.com",
//     projectId: "anotherrep",
//     storageBucket: "anotherrep.appspot.com",
//     messagingSenderId: "556199010113",
//     appId: "1:556199010113:web:4cb4f552d776480555cbc0"
//   };

  var firebaseConfig = {
    apiKey: "AIzaSyAT0u3qWkmAjSc-cPFmB0EfwjAsL5_d3QM",
    authDomain: "dontsitbefit.firebaseapp.com",
    databaseURL: "https://anotherrep.firebaseio.com",
    projectId: "anotherrep",
    storageBucket: "anotherrep.appspot.com",
    messagingSenderId: "556199010113",
    appId: "1:556199010113:web:0576ce5108606ca855cbc0"
  };


firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  preserveOnLogout: ['homepage'],
  userProfile: 'users',
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);

