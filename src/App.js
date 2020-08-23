import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import HomePage from './HomePage';
import PageRegister from './PageRegister';
import PageLogin from './PageLogin';
import UserProfile from './UserProfile';
import Users from './Users';


import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const App = props => {
  if (!isLoaded(props.auth, props.profile)) {
    return <div>Authentication loading...</div>;
  }

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/editor">
        <CardEditor />
      </Route>
      <Route exact path="/viewer/:deckId">
        <CardViewer />
      </Route>
      <Route exact path="/register">
        <PageRegister />
      </Route>
      <Route exact path="/login">
        <PageLogin />
      </Route>
      <Route exact path="/user/:userId">
        <UserProfile />
      </Route>
      <Route exact path="/users">
        <Users />
      </Route>
      <Route>
        <div>Page not found!</div>
      </Route>
    </Switch>
  );
};

const mapStateToProps = state => {
  return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(App);
