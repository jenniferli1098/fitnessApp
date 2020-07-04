import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/app";

import {BrowserRouter} from 'react-router-dom';

import {Provider } from 'react-redux';
import 'firebase/auth';

import 'firebase/database';
import 'firebase/auth';

import {createStore, combineReducers, compose} from 'redux';
import {
    ReactReduxFirebaseProvider,
    firebaseReducer
} from 'react-redux-firebase';

import {composeWithDevTools} from 'redux-devtools-extension';


const firebaseConfig = {
    apiKey: "AIzaSyBUj_HKqrCVR9Pe3cSo2nQFTyAefDZqf2Y",
    authDomain: "datamatch-bootcamp-278bd.firebaseapp.com",
    databaseURL: "https://datamatch-bootcamp-278bd.firebaseio.com",
    projectId: "datamatch-bootcamp-278bd",
    storageBucket: "datamatch-bootcamp-278bd.appspot.com",
    messagingSenderId: "649002161434",
    appId: "1:649002161434:web:84d0782b701b51cbea88a3"
};



firebase.initializeApp(firebaseConfig);

//add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
})

const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
}
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
}
ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>

,document.getElementById('root'));
