import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { importCharacter, updateInfo } from '../../redux/characterReducer';
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
        const { user, match } = this.props

        axios.get( `/api/character/${match.params.id * 1}/${match.params.name}` )
            .then( response => {
                if( !response.data ) {
                    alert( 'This character does not exist' )
                    this.props.history.push('/playercharacters')
                    console.log( 'This character does not exist' )
                    return;
                }
                else {
                    console.log( 'CHARACTER DATA', response.data)
                    this.props.importCharacter( response.data )
                }
            } )
            .catch( err => console.log( err ) )
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

    saveCharacter = ( sheetType ) => {
        let body = this.props.character

        if( this.props.character.userId === this.props.user.id ) {

            console.log( `UNMOUNTING and SAVING ${sheetType}` )

            axios.put( `/api/smallUpdateCharacter/${this.props.character.cid}`, body )
                .then( () => console.log( 'character updated!' ) )
        }
        else
            alert( 'You are not authorized to save changes to this sheet' )
    }

    render() {
        const { activeTab } = this.state
        const { character, updateInfo } = this.props

        return (
            <div className='display-main'>
                <Header />

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
                            ? <CharacterSheet character={character} />
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
    const { character } = state.character

    return {
        user,
        character
    };
}

export default connect( mapStateToProps, { importCharacter, updateInfo } )(CharacterDisplay);