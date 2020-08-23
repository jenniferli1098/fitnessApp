import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {firebaseConnect, isLoaded, isEmpty, populate} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'

import Figure  from 'react-bootstrap/Figure';

import Table from 'react-bootstrap/Table'

const UserProfile = props => {
    if (!isLoaded(props.username)) {
        return <div>Loading...</div>;
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
                    <td>
                    {workout.num}
                    </td>
                        
                </tr>    
        );
    
    });
    return (
        <div>
            <div>
            <img src={`https://api.adorable.io/avatars/250/${props.userId}@adorable.io.png`} />
                
            </div>
            <div>Hello {props.username} </div>
            <div>Hello {props.numWorkouts} </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Workout</th>
                    <th>Description</th>
                    <th>Views</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts}
                </tbody>
            </Table>

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
 