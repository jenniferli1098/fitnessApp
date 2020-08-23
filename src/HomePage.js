import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './HomePage.css';
import './UserProfile.css';

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
    var addButton = {};
    if (!isLoaded(this.props.homepage)) {
        return <div>Loading...</div>;
    }else{
        addButton = (
            <Link to = {"/editor"} ><button className="menuBtn" title="Create new workout"><i className="fa fa-plus"></i></button></Link>
        );
    }

    const decks = Object.keys(this.props.homepage).map(deckId =>{
        const deck = this.props.homepage[deckId];
        if (deck.visibility === false && deck.owner !== this.props.isLoggedIn) {
            return null;
        }
        console.log(deck);
        
        return (
<<<<<<< HEAD
            <div className="deck-card">
            <h3><Link to = {"/viewer/" + deckId} >{deck.name}</Link></h3>
            <p>{deck.description}</p>
            <img id="ex1.png" class="center" width="200" height="150" />
            </div>
            
=======
            <Link to = {"/viewer/" + deckId} >  
            <div class="deck-card">   
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            </div>   
            </Link>
                        
>>>>>>> 47d42df444a12ea87cd94dcb651c85b6e71f2d81

            /* <tr key={deckId}>
                <td>
                    <Link to = {"/viewer/" + deckId} >{deck.name}</Link>
                </td>
                <td>{deck.description}</td> */
                /*{ <td>{users[owner].username}</td> }*/
                /*{ <td className="text-right"><button className="btn btn-light"><i className="fa fa-star-o"></i></button></td> }*/
            /* </tr> */
        );
    
    });

    return (
        <div className = "container">
            <br></br>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            
            

            <div className="banner">

                <h1>Fitness Fun</h1>
                <br></br>
                <h3><i>Stay Healthy. Stay Safe.</i></h3>

            </div>


            <div className="workout-container">

            <h2>Workout Routines</h2>
            <br></br>
            <h5>
            {this.props.isLoggedIn ? (
                    <Link to="/editor">Add a New Workout Routine</Link>
                ):( 
                    <div></div>
                )}
            </h5>
            
            <div className="row">

                <Container fluid className="workout-display">
                    <Row>
                        {decks}
                    </Row>
                </Container>
                
                {/*<table className="table">
                
                    <tbody>
                    {decks}
                    </tbody>
                    
                </table>*/}
                
            </div>

            <div className="account">
                <h2>My Account</h2>
                <br></br>
                {this.props.isLoggedIn ? (
                    <div>
                        <div><Link to={"/user/" + this.props.isLoggedIn}><h5>Go to My Profile</h5></Link></div>
                        <br></br>
                        <button className="btn btn-primary" onClick={() => {this.props.firebase.logout(); window.location.reload(true);}}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <h5><Link to="/register">Register</Link></h5>
                        <br/>
                        <h5><Link to="/login">Login</Link></h5>
                    </div>
                )
                }
            </div>
            </div>

            
            
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
