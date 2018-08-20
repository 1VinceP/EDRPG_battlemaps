import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { importCharacter, updateInfo, saveCharacter } from '../../redux/characterReducer';
import { commaFormatted } from '../../utils/helperMethods';
import Header from '../../components/Header/Header';
import Tabs from '../../components/Tabs/Tabs';
import CharacterSheet from '../../components/Sheets/CharacterSheet';
import SpaceshipSheet from '../../components/Sheets/SpaceshipSheet';
import VehicleSheet from '../../components/Sheets/VehicleSheet';
import './characterDisplay.css';

class CharacterDisplay extends Component {
    state = {
        view: 'character',
        spaceships: [],
        vehicles: [],
        activeTab: ''
    }

    componentDidMount() {
        this.getCharacter()
    }

    getCharacter() {
        const { id, name } = this.props.match.params

        this.props.importCharacter( id, name );
    }

    componentDidUpdate( prevProps, prevState ) {
        // if( prevState.activeTab !== this.state.activeTab )
        //     this.getCharacter()
        if( prevProps.character.name && prevProps.character.name !== this.props.character.name ) {
            console.log( `Character changed from ${prevProps.character.name} to ${this.props.character.name}` )
            this.getCharacter()
        }
    }

    componentWillUnmount() {
        console.log( 'UNMOUNTING' )
    }

    switchContent = ( tabName ) => {
        this.setState({
            activeTab: tabName
        })
    }

    render() {
        const { activeTab } = this.state
        const { character, user, updateInfo, characterIsSaved } = this.props

        if( character.cid == this.props.match.params.id ) {
            return (
                <div className='display-main'>
                    <Header>
                        { user.userid === character.userid
                            ? characterIsSaved === 'pending'
                                ? <div style={{color: '#fff'}}>Saving...</div>
                                : <button onClick={() => this.props.saveCharacter( character, user.userid )} disabled={!!characterIsSaved}>Save Character</button>
                            : null
                        }
                    </Header>

                    <div className='display-body'>
                        <h1 className='display-title'>{character.name}</h1>
                        <div className='display-cash'>
                            <div>
                                <input name='credits' onChange={e => updateInfo(e)} value={character.credits} />
                                Cr
                            </div>
                            <div id='cash-second'>
                                <input name='m_cr' onChange={e => updateInfo(e)} value={character.m_cr} />
                                mCr
                            </div>
                            <div id='cash-third'>
                                <input name='units' onChange={e => updateInfo(e)} value={character.units} />
                                u
                            </div>
                        </div>

                        <Tabs
                            titles={[ 'Character', 'Spaceships', 'Vehicles' ]}
                            default='Character'
                            backgroundColor='#313132'
                            sendTab={this.switchContent}
                        />

                        <section className='display-content'>
                            { activeTab === 'Character'
                                ? <CharacterSheet character={character} routeHistory={this.props.history} />
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
        else {
            return (
                <div className='equip-loading-main'>
                    <h1>Fetching Character Data...</h1>
                </div>
            )
        }
    }
}

function mapStateToProps( state ) {
    const { user } = state.auth;
    const { character, characterIsSaved } = state.character

    return {
        user,
        character,
        characterIsSaved
    };
}

export default connect( mapStateToProps, { importCharacter, updateInfo, saveCharacter } )(CharacterDisplay);