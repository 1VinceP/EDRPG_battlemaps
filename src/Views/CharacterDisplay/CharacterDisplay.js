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
        const { character, user } = this.props

        if( prevProps.character.cid && prevProps.character.cid !== character.cid ) {
            console.log( `Character changed from ${prevProps.character.name} to ${character.name}` )
            this.getCharacter()
        }
        if( character.locked && user.userid !== character.userid * 1 ) {
            this.props.history.push('/locked')
            console.log( `%cThis character is locked to ${character.userid}, and you (${user.userid}) do not have permission`, 'color: red;' );
        }
        else {
            console.log( `%cUser ${user.userid} is allowed to access character ${character.cid}`, 'color: lime;' )
        }
    }

    componentWillUnmount() {
        console.log( 'UNMOUNTING' )
    }

    handleLock( val ) {
        const { character, user } = this.props
        let body = { locked: val, cid: character.cid }

        axios.put( `/api/handleLock/${user.userid}/${character.userid}`, body )
            .then( () => this.getCharacter() )
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
                            && characterIsSaved === 'pending'
                                ? <div style={{color: '#fff'}}>Saving...</div>
                                : <button onClick={() => this.props.saveCharacter( character, user.userid )} disabled={!!characterIsSaved}>Save Character</button>
                        }
                        {
                            user.userid === character.userid
                                && character.locked
                                ? <button onClick={() => this.handleLock(true)}>Unlock Character</button>
                                : <button onClick={() => this.handleLock(false)}>Lock Character</button>
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