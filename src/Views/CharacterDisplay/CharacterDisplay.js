import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
import CharacterSheet from '../../components/Sheets/CharacterSheet';
import SpaceshipSheet from '../../components/Sheets/SpaceshipSheet';
import VehicleSheet from '../../components/Sheets/VehicleSheet';
import './characterDisplay.css';

class CharacterDisplay extends Component {
    state = {
        view: 'character',
        character: {},
        activeTab: ''
    }

    componentDidMount() {
        const { user, match } = this.props

        console.log( user.id, match.params.id * 1 )

        axios.get( `/api/character/${match.params.id * 1}/${user.id}` )
            .then( response => {
                console.log( response )
                this.setState({ character: response.data[0] })
            } )
            .catch( err => console.log( err ) )
    }

    switchContent = ( tabName ) => {
        this.setState({
            activeTab: tabName
        })
    }

    render() {
        const { character, activeTab } = this.state

        return (
            <div className='display-main'>
                <Header />

                <div className='display-body'>
                    <h1 className='display-title'>{character.name}</h1>

                    <Tabs
                        titles={[ 'Character', 'Spaceships', 'Vehicles' ]}
                        default='Character'
                        backgroundColor='#313132'
                        sendTab={this.switchContent}
                    />

                    { activeTab === 'Character'
                        ? <CharacterSheet />
                        : activeTab === 'Spaceship'
                            ? <SpaceshipSheet />
                            : activeTab === 'Vehicle'
                                && <VehicleSheet />
                    }
                </div>
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

export default connect( mapStateToProps, {} )(CharacterDisplay);