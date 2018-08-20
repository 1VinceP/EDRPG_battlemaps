import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { importCharacter, updateInfo, assignCheck, useKarma, saveCharacter } from '../../redux/characterReducer';
import { normalizeString } from '../../utils/helperMethods';
import karmaData from '../../data/karma.json';
import rangedData from '../../data/ranged_weapons.json';
import SkillContainer from '../../components/SkillContainer/SkillContainer';
import Equipment from '../../components/Equipment/Equipment';
import Notes from '../../components/Notes/Notes';
import './characterSheet.css';

class CharacterSheet extends Component {
    static propTypes = {
        character: PropTypes.object.isRequired
    }

    state = {
        swirly: true,
        showSkills: true,
        selectedKarma: null
    }

    handleInfo( e ) {
        // const { name, value } = e.target

        // this.setState({ character: {...this.state.character, [name]: value} })
        this.props.updateInfo( e )
    }

    selectKarma( i ) {
        if( this.state.selectedKarma !== i )
            this.setState({ selectedKarma: i })
        else
            this.setState({ selectedKarma: null })
    }

    onCheck( skill ) {
        let checked = [...this.props.character.checked]
        let found = _.findIndex( checked, s => s === skill )

        if( found === -1 )
            // this.setState({ character: {...this.state.character, checked: [...checked, skill]} })
            this.props.assignCheck( [...checked, skill] )
        else {
            checked.splice( found, 1 )
            // this.setState({ character: {...this.state.character, checked: [...checked]} })
            this.props.assignCheck( [...checked] )
        }
    }

    fireWeapon( index ) {
        console.log( `%cThe weapon is ${this.state.character.ranged_weapons[index]}`, 'color: orange;' )
    }

    deleteCharacter() {
        const { userid } = this.props;
        const { userid: uid, cid } = this.props.character
        let confirmed = window.confirm('You are about to permanently delete this character. Are you sure you wish to continue?');

        if( confirmed ) {
            // axios.delete( `/api/deleteCharacter/${userid}/${uid}/${cid}` )
            //     .then( () => {
            //         this.props.history.push('/playercharacters')
            //     } )
            console.log( this.props.history )
        }
    }

    //////////////////// RENDER METHODS
    renderKarma() {
        const { selectedKarma } = this.state
        const { character } = this.props

        return character.karmic_abilities.map( ( karma, i ) => {
            let details

            for( let key in karmaData ) {
                if( _.camelCase(key) === _.camelCase( karma ) ) {
                    details = karmaData[key]
                }
            }

            return (
                <div key={i} className={selectedKarma === i ? 'cs-karma cs-selected-karma' : 'cs-karma cs-unselected-karma' } onClick={() => this.selectKarma(i)}>
                    <div>{normalizeString(karma)}</div>
                    <div>{details.cost}</div>
                    <div className={selectedKarma === i ? 'cs-kd cs-kd-show' : 'cs-kd cs-kd-hide' }>
                        <div>{details.effect}</div>
                        <div style={{ fontStyle: 'italic', color: '#f0f' }}>{normalizeString(details.situation)} - {normalizeString(details.type)}</div>
                        <button className='cs-k-button' onClick={() => this.props.useKarma(character.current_karma, details.cost)}>Use this ability</button>
                    </div>
                </div>
            )
        } )
    }

    render() {
        const { showSkills } = this.state
        const { character, characterIsSaved, userid } = this.props

        console.log( character )

        return (
            <div>
                <section className='cs-head'>
                    <div className='cs-head-stats'>
                        <p>Karma</p>
                        <div>
                            <input id='karma' value={character.current_karma} type='number' max={character.max_karma} name='current_karma' onChange={e => this.handleInfo(e)} /> / {character.max_karma}
                        </div>
                    </div>
                    <div className='cs-head-stats'>
                        <p>Endurance</p>
                        <div>
                            <input id='endurance' value={character.current_endurance} type='number' max={character.max_endurance} name='current_endurance' onChange={e => this.handleInfo(e)} /> / {character.max_endurance}
                        </div>
                    </div>
                </section>

                <section className='cs-info'>

                    <div className='cs-rank'>
                        <div>{character.rank}</div>
                        {/* <div>{character.rank_points}</div> */}
                        <input value={character.rank_points} name='rank_points' onChange={e => this.handleInfo(e)} />
                    </div>

                    <div className='cs-defence'>
                        <div className='cs-d-box deg0'>
                            <div>Parry</div>
                            <div>{Math.floor(character.personal.parry / 10) || 0}</div>
                        </div>
                        <div className='cs-d-box deg90'>
                            <div>Speed</div>
                            <div>10</div>
                        </div>
                        <div className='cs-d-box deg180'>
                            <div>Dodge</div>
                            <div>{Math.floor(character.personal.dodge / 10) || 0}</div>
                        </div>
                        <div className='cs-d-box deg270'>
                            <div>Tactics</div>
                            <div>{Math.floor(character.intelligence.tactics / 10) || 0}</div>
                        </div>
                    </div>
                    <div className='cs-info-stats'>
                        <input value={character.gender} name='gender' onChange={e => this.props.updateInfo(e)} />
                        <input value={character.age} type='number' name='age' onChange={e => this.props.updateInfo(e)} />
                        <input value={character.height} name='height' onChange={e => this.props.updateInfo(e)} />
                        <input value={character.weight} name='weight' onChange={e => this.props.updateInfo(e)} />
                    </div>

                </section>

                <section className='cs-body'>
                    <section className='cs-body-col'>
                        {/* Karma section */}
                        <div className='cs-karmas'>
                            {this.renderKarma()}
                        </div>

                        {/* Skills section */}
                        <button className='cs-hide-skills-button' onClick={() => this.setState({ showSkills: !showSkills })}>
                            {showSkills ? 'Hide' : 'Show' } skills
                        </button>
                        <div className={showSkills ? 'cs-skills-show' : 'cs-skills-hide'}>
                        {/* <div className='cs-skills-show'> */}
                            <SkillContainer title='Personal' skills={character.personal} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Vehicle' skills={character.vehicle} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Intelligence' skills={character.intelligence} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Social' skills={character.social} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Espionage' skills={character.espionage} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                        </div>
                    </section>

                    {/* Equipment section */}
                    <section className='cs-body-col cs-body-col-equip'>
                        <Equipment ownedData={character.ranged_weapons} bonuses={character.personal} type='ranged' />
                        <Equipment ownedData={character.melee_weapons} bonuses={character.personal} type='melee' />
                        <Equipment ownedData={character.grenades} bonuses={character.personal} type='grenades' />
                        <Notes notes={character.notes} cid={character.cid} />
                    </section>
                </section>

                { userid === character.userid
                    ? <button onClick={() => this.deleteCharacter()}>Delete Character</button>
                    : null
                }

            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { character, characterIsSaved } = state.character;
    const { userid } = state.auth.user;

    return {
        character,
        characterIsSaved,
        userid
    };
}

export default connect( mapStateToProps, { importCharacter, updateInfo, assignCheck, useKarma, saveCharacter } )(CharacterSheet);