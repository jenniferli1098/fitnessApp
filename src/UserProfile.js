import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {firebaseConnect, isLoaded, isEmpty, populate} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'

import Figure  from 'react-bootstrap/Figure';
import './UserProfile.css';

import Table from 'react-bootstrap/Table'

const UserProfile = props => {
    var addButton = {};
    if (!isLoaded(props.username) && !isLoaded(props.workouts)) {
        return <div>Loading...</div>;
    } else{
        addButton = (
            <Link to = {"/editor"} ><button class="menuBtn" title="Create new workout"><i class="fa fa-plus"></i></button></Link>
        );
    }
    const workouts = Object.keys(props.workouts).map(workoutId =>{
        const workout = props.workouts[workoutId];
        if (workout.visibility === false && workout.owner !== this.props.isLoggedIn) {
            return null;
        }
        console.log(workout);
        return (
            
                <tr>
                    <td>
                    <Link to = {"/viewer/" + workout.id} >{workout.name}</Link>
                    </td>
                    <td>
                    {workout.description}
                    </td>
                        
                </tr>    
        );
    
    });
    return (
        <div class="container alert alert-success mt-5">
            <div class="row">
                <div class="col-m-6 p-1">
                    <img src={`https://api.adorable.io/avatars/250/${props.userId}@adorable.io.png`} class='profile' />
                </div>
                <div class="col-m-6 p-4 text-left">
                        <h3>{props.username}</h3>
                        <br/>
                        <p>{props.firstname} {props.lastname}</p>
                        <p>{props.numWorkouts} workouts done</p>
                </div>
                <br/>
            </div>
            <div class="row">
                <Table striped hover>
                    <thead>
                        <tr>
                        <th>Workout</th>
                        <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts}
                    </tbody>
                </Table>
            </div>

            {addButton}           

        </div>
    );
}


const populates = [
    { child: 'owner', root: 'users' } // replace owner with user object
  ]

const mapStateToProps = (state, props) => {


    console.log(state);
    const userId = props.match.params.userId;
    console.log(state.firebase.data[userId]);
    const profile = state.firebase.data[userId];
    
    const username = profile && profile.username;
    const numWorkouts = profile && profile.numWorkouts;
    const workouts = profile && profile.workouts;


    return {username:username, numWorkouts:numWorkouts, workouts:workouts, isLoggedIn: state.firebase.auth.uid , userId: userId};
}




export default compose(
    withRouter,
    firebaseConnect(props =>{
        const id = props.match.params.userId;
        //console.log(id);
        return [{path:`/users/${id}`, storeAs: id}, ];
    }),
    connect(mapStateToProps),
 )(UserProfile);
 