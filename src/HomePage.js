import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './HomePage.css';

/*New imports from bootstrap for Row/Col*/
/*Must run 'npm install react-bootstrap bootstrap' on cmd line first*/
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render () {
    if (!isLoaded(this.props.homepage)) {
        return <div>Loading...</div>;
    }



    const decks = Object.keys(this.props.homepage).map(deckId =>{
        const deck = this.props.homepage[deckId];
        if (deck.visibility === false && deck.owner !== this.props.isLoggedIn) {
            return null;
        }
        console.log(deck);
        return (

            <Container>
                <Row>
                    <Col>
                    <Link to = {"/viewer/" + deckId} >{deck.name}</Link>
                    </Col>
                    <Col>
                    {deck.description}
                    </Col>
                        
                </Row>    
            </Container>

            /* <tr key={deckId}>
                <td>
                    <Link to = {"/viewer/" + deckId} >{deck.name}</Link>
                </td>
                <td>{deck.description}</td> */
                /*{ <td>{users[owner].username}</td> }*/
                /*{ <td class="text-right"><button class="btn btn-light"><i class="fa fa-star-o"></i></button></td> }*/
            /* </tr> */
        );
    
    });

    return (
        <div class="container">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <h1>Home Page</h1>
            {this.props.isLoggedIn ? (
                <Link to="/editor">New Deck</Link>
            ):( 
                <div></div>
            )}
            
            <div class="row">
                
                <table class="table">
                    <tbody>
                        {decks}
                    </tbody>
                    
                </table>
                
            </div>
            <h3>Account</h3>
            {this.props.isLoggedIn ? (
                <div>
                    <div>{this.props.email}</div>
                    <br></br>
                    <button class="btn btn-primary" onClick={() => {this.props.firebase.logout(); window.location.reload(true);}}>Logout</button>
                </div>
            ) : (
                <div>
                    <Link to="/register">Register</Link>
                    <br/>
                    <Link to="/login">Login</Link>
                </div>
            )
            }
            
        </div>
        );
    }
};


const mapStateToProps = state => {
    return {
      homepage: state.firebase.data.homepage,
      email: state.firebase.auth.email,
      isLoggedIn: state.firebase.auth.uid,
    };
  };
  
  export default compose(
    firebaseConnect(['/homepage']),
    connect(mapStateToProps),
  )(HomePage);