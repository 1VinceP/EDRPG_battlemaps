import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { importCharacter, updateInfo, assignCheck, useKarma, saveCharacter } from '../../redux/characterReducer';
import { normalizeString } from '../../utils/helperMethods';
import karmaData from '../../data/karma.json';
import rangedData from '../../data/ranged_weapons.json';
import ScrollContainer from '../../components/common/Scroll/ScrollContainer';
import SkillContainer from '../../components/SkillContainer/SkillContainer';
import StatContainer from '../../components/StatContainer/StatContainer'
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
            this.props.assignCheck( [...checked, skill] )
        else {
            checked.splice( found, 1 )
            this.props.assignCheck( [...checked] )
        }
    }

    fireWeapon( index ) {
        console.log( `%cThe weapon is ${this.state.character.ranged_weapons[index]}`, 'color: orange;' )
    }

    deleteCharacter() {
        const { userid } = this.props;
        const { userid: uid, cid, name } = this.props.character
        let confirmed = window.prompt('You are about to permanently delete this character. If you are sure, type your character\'s name below');

        if( confirmed === name ) {
            axios.delete( `/api/deleteCharacter/${userid}/${uid}/${cid}` )
                .then( () => {
                    this.props.routeHistory.push('/playercharacters')
                } )
            console.log( 'This character would be deleted' )
        }
    }

    render() {
        const { showSkills } = this.state
        const { character, characterIsSaved, userid, updateInfo } = this.props

        console.log( character )

        return (
            <div>
                <section className='cs-head'>
                    <div className='cs-head-stats'>
                        <p>Karma</p>
                        <div>
                            { userid === character.userid * 1
                                ? <div><input id='karma' value={character.current_karma} type='number' max={character.max_karma} name='current_karma' onChange={e => updateInfo(e)} /> / {character.max_karma}</div>
                                : <div>{character.current_karma} / {character.max_karma}</div>
                            }

                        </div>
                    </div>
                    <div className='cs-head-stats'>
                        <p>Endurance</p>
                        <div>
                            { userid === character.userid * 1
                                ? <div><input id='endurance' value={character.current_endurance} type='number' max={character.max_endurance} name='current_endurance' onChange={e => updateInfo(e)} /> / {character.max_endurance}</div>
                                : <div>{character.current_endurance} / {character.max_endurance}</div>
                            }

                        </div>
                    </div>
                </section>

                <section className='cs-info'>

                    <div className='cs-rank'>
                        <div>{character.rank}</div>
                        <input value={character.rank_points} name='rank_points' onChange={e => updateInfo(e)} />
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
                            { character.karmic_abilities.length > 0
                                ? <ScrollContainer
                                    list={character.karmic_abilities}
                                    border='#7d00d1'
                                    type='karma'
                                />
                                : <div className='no-scrolls'>Karma</div>
                            }
                        </div>

                        {/* Skills section */}
                        <button className='cs-hide-skills-button' onClick={() => this.setState({ showSkills: !showSkills })}>
                            {showSkills ? 'Hide' : 'Show' } skills
                        </button>
                        <div className={showSkills ? 'cs-skills-show' : 'cs-skills-hide'}>
                            <SkillContainer title='Personal' skills={character.personal} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Vehicle' skills={character.vehicle} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Intelligence' skills={character.intelligence} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Social' skills={character.social} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Espionage' skills={character.espionage} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                        </div>
                    </section>

                    {/* Equipment section */}
                    <section className='cs-body-col cs-body-col-equip'>
                        <div className='cs-backgrounds'>
                            <ScrollContainer
                                list={character.backgrounds}
                                type='bg'
                                small
                            />
                            { character.enhancements.length > 0
                                ? <ScrollContainer
                                    list={character.enhancements}
                                    border='#54e4fd'
                                    type='enhance'
                                    small
                                />
                                : <div className='no-scrolls'>Enhancements</div>
                            }
                        </div>
                        <Equipment ownedData={character.ranged_weapons} bonuses={character.personal} type='ranged' />
                        <Equipment ownedData={character.melee_weapons} bonuses={character.personal} type='melee' />
                        <Equipment ownedData={character.grenades} bonuses={character.personal} type='grenades' />
                        <Equipment ownedData={character.armor} type='armor' />
                        { userid === character.userid * 1 && <Notes notes={character.notes} cid={character.cid} /> }
                    </section>
                </section>

                { userid === character.userid * 1
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