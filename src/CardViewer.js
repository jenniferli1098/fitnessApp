import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'

class CardViewer extends React.Component {
    constructor(props) {
        super(props);
       // console.log(this.props.cards[0].front);
        this.state = {
            front: true,
            index: 0,
            cards: [
                {front: 'front1', back: 'back1'},
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
        this.setState({front:true});
        //console.log(this.state.index);
    };
    prev = () => {
        const index = (this.state.index - 1);
        this.setState({index});
        this.setState({front:true});
        //console.log(this.state.index);
    };


    flip =() => {
        //console.log(this.state.front);
        this.setState({front: !this.state.front});
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

            //console.log(this.state.index);
            const card = this.props.cards[this.state.index];
            if (this.state.front) {
                return (<p>{card.front}</p>);
            } else {
                return (<p>{card.back}</p>);
            }
        }
        return (
            <div class="container">
                <br></br>
                <div class="row">
                    <Link to="/"><h2>{this.props.name}</h2></Link>
                    
                </div>
                <div class="row">
                    {this.props.description}
                </div>
                <hr/>   
                <div class="row align-items-center">

                    <div class="col-1"></div>
                    <div class="col-1">
                        <button class="btn btn-primary" name="prev" onClick={this.prev} disabled={this.state.index === 0}>Prev</button>
                    </div>
                    <div class="col-8">
                        <button class="btn btn-light flashcard"onClick={this.flip}>{getCard ()}</button>
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
                <div class="row text-center">
                    <div class="col align-self-center">
                        {/* <button class="btn btn-light center"onClick={this.shuffle}>Shuffle</button> */}
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col align-self-center">
                    {/* <Link to="/editor">Switch to Editor</Link> */}
                    </div>
                </div>
                
            </div>

        );

    }
}
const mapStateToProps = (state, props) => {

    console.log(state);

    const deck = state.firebase.data[props.match.params.deckId];
    const name = deck && deck.name;
    const cards = deck && deck.cards;
    const description = deck && deck.description
    return {cards: cards, name: name, description: description};
}

export default compose(
    withRouter,
    firebaseConnect(props =>{
        // console.log('props',props);
        const deckId = props.match.params.deckId;
        return [{path: `/flashcards/${deckId}`, storeAs: deckId}];
    }),
    connect(mapStateToProps),
 )(CardViewer);

 //firebaseConnect([{path: '/flashcards/chemistry', storeAs:'deck1'}])(CardViewer);

