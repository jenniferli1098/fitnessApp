import React from 'react';
import './CardEditor.css';
import {Link, withRouter, Redirect} from 'react-router-dom';
import {firebaseConnect, populate} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';

class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cards: [
                {move: 'Jumping Jacks', reps: '10'},
            ],
            move: '',
            reps: '',
            name: '',
            description: '',
            tag: '',
            visibility: true,
        };
    }

    addCard = () => {
        const card = {move: this.state.move, reps: this.state.reps};
        const cards = this.state.cards.slice().concat(card);
        this.setState({cards});
        this.setState ({move: '', reps: ''});
    };

    deleteCard = index => {
        const cards = this.state.cards.slice(); //sets it into an array
        cards.splice(index, 1); //gets rid of card at index
        this.setState({cards});
    };


    editCard = (side, value, index)  => {
        const cards = this.state.cards.slice();
        console.log(side);
        if(side === "move") {
        cards[index].move = value;

        } else if(side == "reps") {
        cards[index].reps = value;

        }
        this.setState({cards});
        console.log(cards[index].reps);
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

        const updates = {};
        const workoutId = this.props.firebase.push('/workouts').key;
        console.log(this.props.isLoggedIn);
        //add deck
        updates[`/workouts/${workoutId}`] = {
            cards: this.state.cards,
            name: this.state.name,
            description: this.state.description,
            visibility: this.state.visibility,
            owner: this.props.isLoggedIn,
            tag: this.state.tag,
            num: 0
        };

        var workout = {
            name: this.state.name,
            description: this.state.description,
            owner: this.props.isLoggedIn,
            visibility: this.state.visibility,
            tag: this.state.tag,
        }
        updates[`/homepage/${workoutId}`] = workout;

        var workouts = this.props.profile.workouts;
        workout.id = workoutId;
        workouts.push(workout);


        updates[`/users/${this.props.isLoggedIn}/workouts`] = workouts;
        
        const onComplete = () => this.props.history.push(`/viewer/${workoutId}`);
        this.props.firebase.update(`/`, updates, onComplete);
        
    }
    render() {
        
        if (!this.props.isLoggedIn) {
            return <Redirect to="/register" />;
        }
        
        const cards = this.state.cards.map((card, index) =>{
            return (
                <tr>
                    <td><input name="move" class="form-control" value={card.move} title={index} onChange={this.editHandleChange}/></td>
                    <td><input name="reps" class="form-control"value={card.reps} title={index} onChange={this.editHandleChange}/></td>
                    <td><button class="btn btn-light" onClick={() => this.deleteCard(index)}>Delete</button></td>
                </tr>
            )
        });
        return (
            <div class="container">

                <div class="workout-container">
                <button type="button" class="btn btn-link"><Link to="/">Home</Link></button>
                <br></br>
                <div class="row">
                    <h2>Workout Editor</h2>
                </div>
                <div>
                    Workout Name
                    <input 
                        class="form-control"
                        name="name"
                        onChange={this.handleChange}
                        placeholder="Name of workout routine"
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
                        placeholder="Description of workout routine (40 characters max)"
                        maxlength="40"
                        value={this.state.description}
                    />
                </div>
                <br></br>
                <div>
                    Tag
                    <select class="form-control"
                        name="tag"
                        onChange={this.handleChange}
                        placeholder="Tag of workout routine"
                        value={this.state.tag}
                    >
                    <option>Cardio</option>
                    <option>Strength</option>
                    <option>Yoga</option>
                    <option>Sports</option>
                    <option>Cool Down</option>
                    </select>
                </div>
                <br></br>
                <div class="row">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Move</th>
                                <th>Reps</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards}

                            <tr>
                                <td>
                                    <input
                                        class="form-control"
                                        name="move"
                                        onChange={this.handleChange}
                                        placeholder="Move Name"
                                        value={this.state.move}
                                        required
                                    />
                                </td>

                                <td>
                                    <input
                                    class="form-control"
                                    name="reps"
                                    onChange={this.handleChange}
                                    placeholder="Number of Reps"
                                    value={this.state.reps}
                                    required
                                    />
                                </td>


                                <td>
                                    <button class="btn btn-light" onClick={this.addCard} type="submit" disabled={!this.state.reps || !this.state.move}>Add card</button>
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
                        Create New Workout Routine
                    </button>
                </div>

                <br/>
                <br/>
                
                </div>
            </div>
        );
    }
}



const populates = [{ child: 'owner', root: 'users' }];

const mapStateToProps = (state, props) => {

    console.log(state.firebase.profile);

    // const user = populate(state.firebase, state.firebase.auth.uid, populates)
    return { isLoggedIn: state.firebase.auth.uid, profile: state.firebase.profile};
}
export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
    withRouter,
  )(CardEditor);
