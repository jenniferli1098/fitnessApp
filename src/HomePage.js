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
            <Link to = {"/editor"} ><button class="menuBtn" title="Create new workout"><i class="fa fa-plus"></i></button></Link>
        );
    }

    const decks = Object.keys(this.props.homepage).map(deckId =>{
        
        const deck = this.props.homepage[deckId];
        
        if (deck.visibility === false && deck.owner !== this.props.isLoggedIn) {
            return null;
        }
        console.log(deck);
        
        var source = "";
        
        if (deck.tag == "Cardio") {
            source = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/woman-running-type-3_1f3c3-1f3fc-200d-2640-fe0f.png"
        } else if (deck.tag == "Strength"){
            source = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/weight-lifter_1f3cb.png"
        } else if (deck.tag == "Yoga"){
            source = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/person-in-lotus-position_emoji-modifier-fitzpatrick-type-1-2_1f9d8-1f3fb_1f3fb.png"
        } else if (deck.tag == "Sports"){
            source = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/man-with-ball-type-5_26f9-1f3fe-200d-2642-fe0f.png"
        } else {
            source = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/pedestrian_emoji-modifier-fitzpatrick-type-6_1f6b6-1f3ff_1f3ff.png"
        }
        
        return (
            <Link to = {"/viewer/" + deckId} >
            <div class="deck-card">
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
                <img src = {source} id = "exerciseImage" class="center" width="170" height="170" />
            </div>
            </Link>
            

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
        <div class = "container">
            <br></br>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            
            

            <div class="banner">

                <h1>Don't Sit Be Fit</h1>
                <br></br>
                <h3><i>Your personal fitness assistant.</i></h3>

            </div>


            <div class="workout-container">

            <h2>Workouts</h2>
            <br></br>
            <h5>
            {this.props.isLoggedIn ? (
                    <Link to="/editor">Add a New Workout Routine</Link>
                ):(
                    <div></div>
                )}
            </h5>
            
            <div class="row">

                <Container fluid class="workout-display">
                    <Row>
                        {decks}
                    </Row>
                </Container>
                
                {/*<table class="table">
                
                    <tbody>
                    {decks}
                    </tbody>
                    
                </table>*/}
                
            </div>

            <div class="account">
                <h2>My Account</h2>
                <br></br>
                {this.props.isLoggedIn ? (
                    <div>
                        <div><Link to={"/user/" + this.props.isLoggedIn}><h5>Go to My Profile</h5></Link></div>
                        <br></br>
                        <button class="btn btn-primary" onClick={() => {this.props.firebase.logout(); window.location.reload(true);}}>Logout</button>
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
