import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {firebaseConnect, isLoaded, isEmpty, populate} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'

import Table from 'react-bootstrap/Table'

const Users = props => {

    if (!isLoaded(props.users.users)) {
        return <div>Loading...</div>;
    }
    for(var key in props.users.users){
        console.log(key);
    }

    const users = Object.keys(props.users.users).map((key) =>{
        console.log(key);
        var user = props.users.users[key];
        return (
            
                <tr>
                    <td>
                    <Link to = {"/user/" + key} >{user.username}</Link>
                    </td>
                    <td>
                    {user.numWorkouts}
                    </td>
                        
                </tr>    
        );
    
    });
    return (
        <Table>
            <tbody>
                {users}
            </tbody>
        </Table>
    );
}


const populates = [
    { child: 'owner', root: 'users' } // replace owner with user object
  ]

const mapStateToProps = (state, props) => {

    //console.log(state);
    const users = state.firebase.data;
    return {users:users, isLoggedIn: state.firebase.auth.uid };
}




export default compose(
    withRouter,
    firebaseConnect(props =>{
        const id = props.match.params.id;
        return [{path: `/users`, storeAs: id, populates: populates}];
    }),
    connect(mapStateToProps),
 )(Users);
