import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';

class HomePage extends React.Component {
    



    render () {


        

        if(!isLoaded(this.props.decks)) {
            return <div>Loading...</div>
        }

        if(isEmpty(this.props.decks)) {
            return <div>Page not found!</div>
        }
        //console.log(this.props.decks);

        const links = this.props.decks.homepage;
        if (links == null) {return <div>Loading links</div>}
        const keys = Object.keys(links);

        // const decks =  Object.keys(links).forEach(function(key,index) {
        //     console.log(links[key].name);
        //     // key: the name of the object key
        //     // index: the ordinal position of the key within the object 
        //     return (
        //         <div>{links[key].name}</div>
        //         // <a href="/viewer">{this.props.decks[key].name}</a>
        //     );
        // });


        const decks = keys.map((key, index) =>{
            return (
                <tr>
                    <td>
                        <Link to = {"/viewer/" + key} >{links[key].name}</Link>
                    </td>
                    <td>{links[key].description}</td>
                    {/* <td class="text-right"><button class="btn btn-light"><i class="fa fa-star-o"></i></button></td> */}
                </tr>
            );
        });
        

        
        return (
            <div class="container">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                <h1>Home Page</h1>
                <div class="row">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td><Link to="/editor">New Deck</Link></td>
                                <td></td>
                            </tr>

                            {decks}
                        </tbody>
                    </table>
                    <ul>
                    </ul>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {

    console.log(state);

    const decks = state.firebase.data;
    return {decks};
}

export default compose(
    withRouter,
    firebaseConnect([{path: '/homepage', storeAs:'homepage'}]),
    connect(mapStateToProps),
 )(HomePage);
