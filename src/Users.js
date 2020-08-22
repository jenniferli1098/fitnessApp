import React from 'react';
import { withRouter } from 'react-router-dom'

const Users = props => {
    return (
        <div>
        <div>Hello {props.match.params.id} </div>
        <div>Hello {props.match.params.id} </div>

        </div>
    );
}

export default withRouter(Users);