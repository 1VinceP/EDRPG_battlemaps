import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import karmaData from '../../data/karma.json';
import SkillContainer from '../../components/SkillContainer/SkillContainer';
import './characterSheet.css';

class CharacterSheet extends Component {
    static propTypes = {
        character: PropTypes.object.isRequired
    }

    state = {
        showSkills: true,
        selectedKarma: null,
        character: {
            rank_points: 0,
            gender: '',
            age: '',
            height: '',
            weight: '',
            current_endurance: '',
            current_karma: '',
            karmic_abilities: [],
            checked: []
        }
    }

    componentDidMount() {
        if( this.props.character.cid ) {
            this.setState({ character: this.props.character })
        }
    }

    componentDidUpdate( prevProps ) {
        if( this.props.character !== prevProps.character ) {
            this.setState({ character: this.props.character })
        }
    }

    componentWillUnmount() {
        if( this.props.character.cid && this.state.character !== this.props.character ) {
            let body = this.state.character

            console.log( 'UNMOUNTING and SAVING' )

            axios.put( `/api/smallUpdateCharacter/${this.state.character.cid}`, body )
                .then( () => console.log( 'character updated!' ) )
        }
    }

    handleInfo( e ) {
        const { name, value } = e.target

        this.setState({ character: {...this.state.character, [name]: value} })
    }

    selectKarma( i ) {
        if( this.state.selectedKarma !== i )
            this.setState({ selectedKarma: i })
        else
            this.setState({ selectedKarma: null })
    }

    useKarma( cost ) {
        const { character } = this.state

        if( character.current_karma - cost < 0 || character.current_karma === 0 ) {
            console.log( 'Not enough karma left' )
            return;
        }

        if( cost === 'All' )
            cost = character.current_karma

        this.setState({ character: {...character, current_karma: character.current_karma - cost} })
    }

    onCheck( skill ) {
        let checked = [...this.state.character.checked]
        let found = _.findIndex( checked, s => s === skill )

        if( found === -1 )
            this.setState({ character: {...this.state.character, checked: [...checked, skill]} })
        else {
            checked.splice( found, 1 )
            this.setState({ character: {...this.state.character, checked: [...checked]} })
        }
    }

    renderKarma() {
        const { character, selectedKarma } = this.state

        return character.karmic_abilities.map( ( karma, i ) => {
            let details

            for( let key in karmaData ) {
                if( _.camelCase(key) === _.camelCase( karma ) ) {
                    details = karmaData[key]
                }
            }

            return (
                <div key={i} className={selectedKarma === i ? 'cs-karma cs-selected-karma' : 'cs-karma cs-unselected-karma' } onClick={() => this.selectKarma(i)}>
                    <div>{this.normalizeString(karma)}</div>
                    <div>{details.cost}</div>
                    <div className={selectedKarma === i ? 'cs-kd cs-kd-show' : 'cs-kd cs-kd-hide' }>
                        <div>{details.effect}</div>
                        <button className='cs-k-button' onClick={() => this.useKarma(details.cost)}>Use this ability</button>
                    </div>
                </div>
            )
        } )
    }

    normalizeString = str => {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    render() {
        const { showSkills, character } = this.state

        // console.log( character )

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
                    <div>
                        <div>{character.dodge}</div>
                        <div>{character.parry}</div>
                        <div>{character.initiative}</div>
                    </div>
                    <div>
                        <input value={character.gender} name='gender' onChange={e => this.handleInfo(e)} />
                        <input value={character.age} type='number' name='age' onChange={e => this.handleInfo(e)} />
                        <input value={character.height} name='height' onChange={e => this.handleInfo(e)} />
                        <input value={character.weight} name='weight' onChange={e => this.handleInfo(e)} />
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
                            <SkillContainer title='Personal' skills={character.personal} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Vehicle' skills={character.vehicle} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Intelligence' skills={character.intelligence} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Social' skills={character.social} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                            <SkillContainer title='Espionage' skills={character.espionage} onCheck={s => this.onCheck(s)} checkedArr={character.checked} />
                        </div>
                    </section>

                    {/* Equipment section */}
                    <section className='cs-body-col cs-body-col-equip'>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                        <div>This is where the equipment goes</div>
                    </section>
                </section>



            </div>
        )
    }
}

export default CharacterSheet;