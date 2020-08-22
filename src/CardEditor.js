import React from 'react';
import './CardEditor.css';
import {Link, withRouter, Redirect} from 'react-router-dom';
import {firebaseConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cards: [
                {front: 'front1', back: 'back1'},
            ],
            front: '',
            back: '',
            name: '',
            description: '',
            visibility: true,
        };
    }

    

    addCard = () => {
        const card = {front: this.state.front, back: this.state.back};
        const cards = this.state.cards.slice().concat(card);
        this.setState({cards});
        this.setState ({front: '', back: ''});
    };

    deleteCard = index => {
        const cards = this.state.cards.slice(); //sets it into an array
        cards.splice(index, 1); //gets rid of card at index
        this.setState({cards});
    };


    editCard = (side, value, index)  => {
        const cards = this.state.cards.slice();
        console.log(side);
        if(side === "front") {
        cards[index].front = value;

        } else {
        cards[index].back = value;

        }
        this.setState({cards});
        console.log(cards[index].back);
    }

    handleChange = event => this.setState({[event.target.name]: event.target.value});

    editHandleChange = event => {
        console.log(event.target.name); //index
        this.editCard(event.target.name,event.target.value, event.target.title);

    }
    handleCheckboxChange = event => {
        //console.log(event.target.name);
        //console.log(event.target.checked);
        this.setState({[event.target.name]: event.target.checked});
    }
    createDeck = () => {

        console.log("creating deck");
        const updates = {};
        const deckId = this.props.firebase.push('/workouts').key;
        console.log(this.props.isLoggedIn);
        //add deck
        updates[`/workouts/${deckId}`] = {
            cards: this.state.cards,
            name: this.state.name,
            description: this.state.description,
            visibility: this.state.visibility,
            owner: this.props.isLoggedIn,
        };

        updates[`/homepage/${deckId}`] = {
            name: this.state.name,
            description: this.state.description,
            owner: this.props.isLoggedIn,
            visibility: this.state.visibility,

        };
        const onComplete = () => this.props.history.push(`/viewer/${deckId}`);
        this.props.firebase.update(`/`, updates, onComplete);
        
    }
    render() {

        if (!this.props.isLoggedIn) {
            return <Redirect to="/register" />;
        }
        const cards = this.state.cards.map((card, index) =>{
            return (
                <tr>
                    <td><input name="front" class="form-control" value={card.front} title={index} onChange={this.editHandleChange}/></td>
                    <td><input name="back" class="form-control"value={card.back} title={index} onChange={this.editHandleChange}/></td>
                    <td><button class="btn btn-light" onClick={() => this.deleteCard(index)}>Delete</button></td>
                </tr>
            )
        });
        return (
            <div class="container">
                <br></br>
                <div class="row">
                    <h2>Card Editor</h2>
                </div>
                <div>
                    Deck Name
                    <input 
                        class="form-control"
                        name="name"
                        onChange={this.handleChange}
                        placeholder="Name of deck"
                        value={this.state.name}
                    />
                </div>
                <br></br>
                <div>
                    Description
                    <textarea 
                        class="form-control"
                        name="description"
                        onChange={this.handleChange}
                        placeholder="Description of deck"
                        value={this.state.description}
                    />
                </div>
                <br></br>
                <div class="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Front</th>
                                <th>Back</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards}

                            <tr>
                                <td>
                                    <input
                                        class="form-control"
                                        name="front"
                                        onChange={this.handleChange}
                                        placeholder="Front of card"
                                        value={this.state.front}
                                        required
                                    />
                                </td>

                                <td>
                                    <input
                                    class="form-control"
                                    name="back"
                                    onChange={this.handleChange}
                                    placeholder="Back of card"
                                    value={this.state.back}
                                    required
                                    />
                                </td>
                                <td>
                                    <button class="btn btn-light" onClick={this.addCard} type="submit" disabled={!this.state.back || !this.state.front}>Add card</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    
                </div>
                <div class="row">
                    <label> 
                    <input
                        name="visibility"
                        type="checkbox"
                        checked={this.state.visibility}
                        onChange={this.handleCheckboxChange}/>
                        {'  '}
                        Public</label>
                </div>
                <div class="row">
                    <button
                        class="btn btn-light"
                        onClick={this.createDeck}
                        disabled={this.state.cards.length === 0 || !this.state.name.trim()}
                    >
                        Create Deck
                    </button>
                </div>

                <br/>
                    {/* <Link to="/viewer/{deckId}">Switch to Card Viewer</Link> */}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {

    console.log(state);

    return { isLoggedIn: state.firebase.auth.uid };
}
export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
    withRouter,
  )(CardEditor);