import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {firebaseConnect, isLoaded, isEmpty, populate} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'
import './CardViewer.css';

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
       // console.log(this.props.cards[0].move);
        this.state = {
            index: 0,
            cards: [
                {move: 'move1', reps: 'reps1'},
            ],
        };
    }


    shuffle = () => {
        //alert('s');
        const cards = this.state.cards.slice();

        cards.sort(() => Math.random() - 0.5);
        this.setState({cards});
    }

    //glitch for first next()
    next = () => {
        const index = (this.state.index + 1);
        this.setState({index});
        //console.log(this.state.index);
    };
    
    prev = () => {
        const index = (this.state.index - 1);
        this.setState({index});
        //console.log(this.state.index);
    };


    finishWorkout = () => {
        console.log("done workout");
        var updates = {};
        //add deck
        var num = this.props.num + 1;
        updates[`/workouts/${this.props.deckId}/num`] = num;
        updates[`/homepage/${this.props.deckId}/num`] = num;

        updates[`/users/${this.props.isLoggedIn}/numWorkouts`]=  this.props.res.owner.numWorkouts+1;

        const onComplete = () => this.props.history.push(`/`);
        this.props.firebase.update(`/`, updates, onComplete);
    }
    flip =() => {
        //console.log(this.state.move);
        //this.setState({move: !this.state.move});
    }

    onKeyDown = (e) => {
        console.log("key pressed");
        if (['Enter', 'Tab'].includes(e.key)) {
          // select item
          e.preventDefault();
        } else if (e.key === 'ArrowRight') {
          // go to top item
          if(this.state.index !== this.props.cards.length - 1) {
            this.next();
          }
          e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
          // go to bottom item
          if(this.state.index !== 0) {
            this.prev();
          }
          e.preventDefault();
        } else if (e.key === 'Escape') {
          // escape
          e.preventDefault();
        }
    };

    render () {

        if(!isLoaded(this.props.cards)) {
            return <div>Loading...</div>
        }

        
        if(isEmpty(this.props.cards)) {
            return <div>Page not found!</div>
        }
        
        const getCard = () => {
            const card = this.props.cards[this.state.index];
            return (<div><h4>{card.move}</h4> <p>{card.reps}</p></div>);
        }

        const finished = () => {
            if(this.props.isLoggedIn) {
                console.log("logged In");
                return (<button class="btn btn-primary" onClick={this.finishWorkout} disabled={this.state.index !== this.props.cards.length - 1}>Finished!</button>)
            }
        }
        
        return (
                <div class="container">
                <div class="workout-container">
                <button type="button" class="btn btn-link"><Link to="/">Home</Link></button>
                <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">
                <h2>{this.props.name}</h2>
                </h4>
                <span class="badge badge-pill badge-primary">Rank</span>
                <p>By: {this.props.res.owner.username}</p>
                <p>Viewed: {this.props.num}</p>
                <hr></hr>
                <p class="mb-0"> {this.props.description} </p>
                <hr></hr>
                </div>
                                
                <div class="alert alert-primary" role="alert">
                <br></br>
                <div class="row align-items-center">

                    <div class="col-1"></div>
                    <div class="col-1">
                        <button class="btn btn-primary" name="prev" onClick={this.prev} disabled={this.state.index === 0}>Prev</button>
                    </div>
                    <div class="col-8">
                        <button class="btn btn-light workout"onClick={this.flip}>{getCard ()}</button>
                    </div>
                    <div class="col-1">
                        <button class="btn btn-primary" name="next" onClick={this.next} disabled={this.state.index === this.props.cards.length - 1}>Next</button>
                    </div>
                    <div class="col-1"></div>
                    
                </div>
                <div class="row text-center">
                    <div class="col align-self-center">
                        <p>{this.state.index + 1} / {this.props.cards.length}</p>
                    </div>
                </div>
            </div>
            <button type="button" right="80%" class="btn btn-link putRight">
                {finished()}
            </button>
                <br/>
                </div>
            </div>
        );
    }
}

const populates = [
    { child: 'owner', root: 'users' } // replace owner with user object
  ]

const mapStateToProps = (state, props) => {

    console.log(props);
    const deckId = props.match.params.deckId;
    const deck = state.firebase.data[deckId];
    console.log(deck)
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    const description = deck && deck.description;

    const num = deck && deck.num;
    const res = populate(state.firebase, props.match.params.deckId, populates);
    console.log(res);
    return {cards: cards, name: name, description: description, deckId: deckId,
        res: res, isLoggedIn: state.firebase.auth.uid, num: num };
}




export default compose(
    withRouter,
    firebaseConnect(props =>{
        // console.log('props',props);
        const deckId = props.match.params.deckId;
        //const res = populate(props.firebase, deckId, populates)
        return [{path: `/workouts/${deckId}`, storeAs: deckId, populates: populates}];
    }),
    connect(mapStateToProps),
 )(CardViewer);


// export default compose(
//     withRouter,
//     firebaseConnect(props =>{
//         // console.log('props',props);
//         const deckId = props.match.params.deckId;
//         return [{path: `/flashcards/${deckId}`, storeAs: deckId}];
//     }),
//     connect(mapStateToProps),
//  )(CardViewer);

 //firebaseConnect([{path: '/flashcards/chemistry', storeAs:'deck1'}])(CardViewer);

