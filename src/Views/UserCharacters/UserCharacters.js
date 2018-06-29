import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './userCharacters.css';

class UserCharacters extends Component {
    state = {
        characters: []
    }

    componentDidMount() {
        this.getChars()
    }

    componentDidUpdate( prevProps, prevState ) {
        if( this.props.user.userid !== prevProps.user.userid ) {
            this.getChars()
        }
    }

    getChars() {
        axios.get( `/api/userCharacters/${this.props.user.userid}` )
        .then( response => {
            console.log( response.data )
            this.setState({
                characters: response.data
            })
        } )
    }

    renderContent() {
        if( !this.props.user.userid )
            return <div className='uc-content'>You must log in to view content on this page.</div>
        else if( !this.state.characters[0] )
            return <div className='uc-content'>You have no saved characters to display.</div>
        else
            return this.renderRows()
    }

    renderRows() {
        return this.state.characters.map( ( char, i ) => {
            return (
                <Link to={`/characterdisplay/${char.cid}/${char.name}`} key={i} className='link uc-character'>
                    <p className='uc-name'>{char.name}</p>
                    <p className='uc-rank'>{char.rank}</p>
                    <p className='uc-arrow'>&#8594;</p>
                </Link>
            )
        } )
    }

    render() {
        return (
            <div className='uc-main'>
                <Header />

                <section className='uc-body'>
                    {this.renderContent()}
                </section>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { user } = state.auth;

    return {
        user
    };
}

export default connect( mapStateToProps, {} )(UserCharacters);