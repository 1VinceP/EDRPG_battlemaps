import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Header from '../../components/Header/Header';
import data from '../../data/characterData';
import './characterSheet.css';


class CharacterSheet extends Component {
    state = {
        name: '',
        rank: 'Harmless',
        rankPoints: 0,
        gender: '',
        age: 0,
        height: '',
        weight: '',
        karma: 10,
        endurance: 20,
        backgrounds: {
            one: '', two: '', three: '', four: '', five: ''
        },
        bgCosts: {
            one: 0, two: 0, three: 0, four: 0, five: 0
        },
        skills: {
            personal: {
                dodge: 10,
                energyWeapons: 10,
                fighting: 10,
                grenade: 10,
                heavyWeapons: 10,
                meleeWeapons: 10,
                parry: 10
            },
            vehicle: {
                navigation: 10,
                repair: 10,
                spaceshipPiloting: 10,
                spaceshipWeapons: 10,
                systems: 10,
                vehiclePiloting: 10,
                vehicleWeapons: 10
            },
            intelligence: {
                computer: 10,
                cultureAndLaw: 10,
                cyber: 10,
                medicine: 10,
                planetaryKnowledge: 10,
                science: 10,
                tactics: 10,
                trading: 10
            },
            social: {
                bargain: 10,
                bluff: 10,
                charm: 10,
                diplomacy: 10,
                gambling: 10,
                insight: 10,
                intimidation: 10,
                streetwise: 10
            },
            espionage: {
                athletics: 10,
                perception: 10,
                security: 10,
                slightOfHand: 10,
                stealth: 10,
                survival: 10
            }
        },
        karmas: { one: 'Escape Death', two: '', three: '', four: '' },
        enhancements: [],
        learning: { 10: '', 9: '', 8: '', 7: '', 6: '', 5: '', 4: '', 3: '', 2: '', 1: '' }
    }

    // Updates the character name
    handleName( e ) {
        this.setState({ name: e.target.value })
    }

    // Updates the character background and stats
    handleBg( e ) {
        const { backgroundStats } = data, { name, value } = e.target // value is background name
        const { backgrounds, enhancements } = this.state
        let num = name.split(' ')[1] // The number of the background
        let cost

        for( let key in backgrounds ) {
            if( backgrounds[key] === value ) {
                alert( `${backgrounds[key]} is already assigned as a background, and will not provide an additional bonus` )
                return;
            }
        }

        for( let key in backgroundStats ) {
            if( key === _.camelCase( value ) ) {
                if( backgrounds[num] ) { // Remove the skill bonus when a filled slot is changed
                    let oldBg = _.camelCase(backgrounds[num])
                    if( backgroundStats[oldBg].hasOwnProperty( 'enhancements' ) ) {
                        let newEnhance = enhancements.filter( enhance => enhance === backgroundStats[oldBg].enhancements[0] || enhance === backgroundStats[oldBg].enhancements[1] )
                        this.setState({ enhancements: newEnhance })
                    }
                    backgroundStats[oldBg].bonuses[10].forEach( skill => this.updateSkills( skill, -10 ))
                    backgroundStats[oldBg].bonuses[20].forEach( skill => this.updateSkills( skill, -20 ))
                }
                if( backgroundStats[key].hasOwnProperty( 'enhancements' ) ) {
                    this.setState({ enhancements: [...enhancements, backgroundStats[key].enhancements] })
                }
                // Apply the new skill bonus
                cost = backgroundStats[key].cost // cost = 1
                backgroundStats[key].bonuses[10].forEach( skill => this.updateSkills( skill, 10 ))
                backgroundStats[key].bonuses[20].forEach( skill => this.updateSkills( skill, 20 ))
            }
        }

        // Set new background and update the cost
        this.setState({
            backgrounds: { ...this.state.backgrounds, [num]: value },
            bgCosts: { ...this.state.bgCosts, [num]: cost },

        })
    }

    handleKarma( e ) {
        const { name, value } = e.target
        const { karmas } = this.state
        let num = name.split(' ')[1]

        for( let key in karmas ) {
            if( karmas[key] === value ) {
                alert( `${karmas[key]} has already been chosen. Please pick another karmic ability` )
                return;
            }
        }

        this.setState({ karmas: { ...karmas, [num]: value } })
    }

    // Updates state.learning with the skill under the appropriate bonus
    handleLearning( skill, bonus ) {
        const { learning } = this.state
        skill = _.camelCase(skill)

        // Do not add points if the skill is already being given points
        for( let key in learning ) {
            if( skill === learning[key] ) {
                alert( `${skill} is already assigned to a different value and will not receive anymore points` )
                return;
            }
        }

        // Remove the bonus when a filled slot is changed
        if( learning[bonus] ) {
            this.updateSkills( learning[bonus], -bonus )
        }

        // Set a slot to be filled and apply the bonus
        this.setState({
            learning: { ...this.state.learning, [bonus]: skill }
        })
        this.updateSkills( skill, bonus )
    }

    // Fire this function whenever a skill value must be updated
    updateSkills( skill, bonus ) {
        const { skills } = this.state

        for( let key in skills ) { // Loop through the skill headings
            for( let prop in skills[key] ) { // Loop through the individual skills of each heading
                if( prop === skill ) { // If there is a match, update the skill value
                    this.setState({
                        skills: { ...this.state.skills, [key]: { ...this.state.skills[key], [prop]: this.state.skills[key][prop] += bonus } }
                    })
                }
            }
        }
    }


    /////////////////////////// HELPER METHODS
    // Calculates the total numerical value of an object's keys
    reduceToTotal( obj ) {
        return _.reduce( obj, ( result, value ) => {
            if( value >= 10 )
                value = Math.floor( value / 10 )
            return result += value
        }, 0 )
    }

    normalizeString( str ) {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }


    /////////////////////////// RENDER METHODS
    renderSkillRow( section ) {
        let skills = []
        for( let key in section ) {
            skills.push({ key, value: section[key] })
        }

        return skills.map( (skill, i) => {
            // let name = skill.key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
            let name = this.normalizeString( skill.key )

            return (
                <div key={i}>
                    <div className='skill-name'>{name}</div>
                    <div className='skill-value'>{skill.value}</div>
                    <div className='skill-bonus'>{Math.floor(skill.value / 10)}</div>
                </div>
            )
        } )
    }

    renderLearning() {
        let skillOptions = data.skills.map( (skill, i) => <option key={i} value={skill}>{skill}</option> )
        let display = []

        for( let i = 10; i > 0; i-- ) {
            display.push( (
                <div key={i} className='each-enhance'>
                    <div>{i}</div>
                    <select onChange={e => this.handleLearning(e.target.value, i)} selected={this.state.learning[i]}>
                        {skillOptions}
                    </select>
                </div>
            ) )
        }

        return display
    }

    render() {
        let flatEnhance = _.flattenDeep( this.state.enhancements )
        let bgOptions = data.backgrounds.map( (bg, i) => <option key={i} value={bg}>{bg}</option> )
        let karmaOptions = data.karma.map( (karma, i) => <option key={i} value={karma}>{karma}</option> )
        let enhancementList = flatEnhance.map( (enhance, i) => <div key={i}>{enhance}</div> )

        console.log( this.state.skills.personal )

        return (
            <div className='character-main'>
                <Header>

                </Header>

                <form className='character-body' autoComplete='off'>
                    <input placeholder='Character Name' name='name' onChange={e => this.handleName(e)} />
                    <section className='character-info'>
                        <div className='character-group'>
                            Rank
                            <input value='Harmless' readOnly />
                        </div>
                        <div className='character-group'>
                            Rank Points
                            <input value='0' readOnly />
                        </div>
                    </section>

                    {/* Basic character info here */}
                    <section className='character-info'>
                        <input placeholder='Gender' name='gender' />
                        <input placeholder='Age' type='number' name='age' />
                        <input placeholder='Height' name='height' />
                        <input placeholder='Weight' name='weight' />
                    </section>

                    {/* Health and Karma inputs */}
                    <section className='character-info'>
                        <div className='character-group'>
                            Karma
                            <input type='number' value={this.state.karma} name='karma' disabled />
                        </div>
                        <div className='character-group'>
                            Endurance
                            <input type='number' value={this.state.endurance} name='endurance' disabled />
                        </div>
                    </section>

                    {/* Defence and Initiative scores */}
                    <section className='character-info'>
                        <div className='character-group3'>
                            Tactics
                            <input value={Math.floor(this.state.skills.intelligence.tactics / 10)} readOnly />
                        </div>
                        <div className='character-group3'>
                            Dodge
                            <input value={Math.floor(this.state.skills.personal.dodge / 10)} readOnly />
                        </div>
                        <div className='character-group3'>
                            Parry
                            <input value={Math.floor(this.state.skills.personal.parry / 10)} readOnly />
                        </div>
                    </section>

                    {/* Background selection */}
                    <section className='character-bgs'>
                        <div>Backgrounds:</div>
                        <select name='bgCosts one' value={this.state.backgrounds.one} onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <select name='bgCosts two' onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <select name='bgCosts three' onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <select name='bgCosts four' onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <select name='bgCosts five' onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <div className='bgs-total'>Cost: {this.reduceToTotal(this.state.bgCosts)}/5</div>
                    </section>

                    {/* Karma selection */}
                    <section className='character-karma'>
                        <div>Karma:</div>
                        <input value='Escape Death' readOnly />
                        <select name='karma two' onChange={e => this.handleKarma(e)}>{karmaOptions}</select>
                        <select name='karma three' onChange={e => this.handleKarma(e)}>{karmaOptions}</select>
                        <select name='karma four' onChange={e => this.handleKarma(e)}>{karmaOptions}</select>
                    </section>

                    {/* Skills display */}
                    <section className='character-skills'>
                        <div>
                            <div>Personal Combat</div>
                            {this.renderSkillRow( this.state.skills.personal )}
                        </div>
                        <div>
                            <div>Vehicle Skills</div>
                            {this.renderSkillRow( this.state.skills.vehicle )}
                        </div>
                        <div>
                            <div>Intelligence</div>
                            {this.renderSkillRow( this.state.skills.intelligence )}
                        </div>
                        <div>
                            <div>Social Skills</div>
                            {this.renderSkillRow( this.state.skills.social )}
                        </div>
                        <div>
                            <div>Espionage</div>
                            {this.renderSkillRow( this.state.skills.espionage )}
                        </div>
                    </section>

                    {/* Enhancements */}
                    <section className='character-enhance'>
                        {enhancementList}
                    </section>

                    {/* Independant Learning */}
                    <section className='character-learning'>
                        <div>Independent Learning:</div>
                        {this.renderLearning()}
                    </section>
                </form>

                <section className='character-buttons'>
                    <button id='character-reset'>Reset</button>
                    <button id='character-save' onClick={() => axios.post( '/api/addCharacter', {personal: this.state.skills.personal} )}>Save</button>
                </section>

            </div>
        )
    }
}

export default CharacterSheet;