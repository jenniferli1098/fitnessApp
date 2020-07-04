import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
class PageRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    }

    register = async () => {
        const credentials = {
            email: this.state.email,
            password: this.state.password,
        };

        try{
            await this.props.firebase.createUser(credentials);
        } catch(error) {
            console.log(error.message);
        }
    }
    render () {
        return (
            <div>
                <p>page register</p>
                <input
                    name="email"
                    onChange={this.handleChange}
                    placeholder="Email"
                    value={this.state.email}
                />
                <br/>

                <input
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Password"
                    value={this.state.password}
                />

                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {isLoggedIn: state.firebase.auth.uid};
}

export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
)
(PageRegister);