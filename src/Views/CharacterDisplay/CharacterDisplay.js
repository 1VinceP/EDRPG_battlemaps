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
        spaceships: [],
        vehicles: [],
        activeTab: ''
    }

    componentDidMount() {
        this.getCharacter()
    }

    getCharacter() {
        const { user, match } = this.props

        axios.get( `/api/character/${match.params.id * 1}/${match.params.name}` )
            .then( response => {
                if( !response.data[0] ) {
                    alert( 'This character does not exist' )
                    this.props.history.push('/playercharacters')
                    console.log( 'This character does not exist' )
                    return;
                }
                else
                    this.setState({ character: response.data[0] })
            } )
            .catch( err => console.log( err ) )
    }

    componentDidUpdate( prevProps, prevState ) {
        if( prevState.activeTab !== this.state.activeTab )
            this.getCharacter()
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

                    <section className='display-content'>
                        { activeTab === 'Character'
                            ? <CharacterSheet character={this.state.character} />
                            : activeTab === 'Spaceships'
                                ? <SpaceshipSheet ship={this.state.spaceships} />
                                : activeTab === 'Vehicles'
                                    && <VehicleSheet vehicle={this.state.vehicles} />
                        }
                    </section>
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