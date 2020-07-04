import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';
import HomePage from './HomePage';
import Users from './Users';
import PageRegister from './PageRegister';
import { Switch, Route } from 'react-router-dom' ;
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

const App = props => {

    if(!isLoaded(props.auth)){
        return <div>Authentication Loading ...</div>
    }
  

    return (
        <Switch>
        <Route exact path="/editor">
            <CardEditor/>
        </Route>
        <Route exact path="/viewer/:deckId">
            <CardViewer/>
        </Route>
        <Route exact path="/">
            <HomePage/>
        </Route>
        <Route path="/users/:id">
            <Users/>
        </Route>
        <Route exact path="/register">
            <PageRegister/>
        </Route>
        <Route>
            <div>Page not found!</div>
        </Route>
        </Switch>
    );



  
}

const mapStateToProps = state => {
    return { auth: state.firebase.auth, profile: state.firebase.profile};
}


export default App;
