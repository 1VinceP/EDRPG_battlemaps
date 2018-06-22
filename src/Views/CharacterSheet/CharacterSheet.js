import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { ToastContainer, Slide, toast } from 'react-toastify';
import Header from '../../components/Header/Header';
import data from '../../data/characterData';
import initialState from '../../data/initialStates';
import 'react-toastify/dist/ReactToastify.css';
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
    handleInfo( e ) {
        this.setState({ [e.target.name]: e.target.value })
    }

    // Updates the character background and stats
    handleBg( e ) {
        const { backgroundStats } = data, { name, value } = e.target // value is background name
        const { backgrounds, enhancements } = this.state
        let num = name.split(' ')[1] // The number of the background
        let cost

        for( let key in backgroundStats ) {
            if( key === _.camelCase( value ) ) {

                // Remove the skill bonus when a filled slot is changed
                if( backgrounds[num] ) {
                    let oldBg = _.camelCase(backgrounds[num])
                    if( backgroundStats[oldBg].hasOwnProperty( 'enhancements' ) ) {
                        let newEnhance = enhancements.filter( enhance => enhance === backgroundStats[oldBg].enhancements[0] || enhance === backgroundStats[oldBg].enhancements[1] )
                        this.setState({ enhancements: newEnhance }) // Remove enhancements
                    }
                    backgroundStats[oldBg].bonuses[10].forEach( skill => this.updateSkills( skill, -10 )) // Remove +10 bonuses
                    backgroundStats[oldBg].bonuses[20].forEach( skill => this.updateSkills( skill, -20 )) // Remove +20 bonuses
                    for( let key in backgrounds ) {
                        if( backgrounds[key] === value ) {
                            this.resetSelect( name )
                            this.toasty( `"${backgrounds[key]}" is already assigned as a background, and will not provide an additional bonus` )
                            this.updateBgToState( num, '', 0 )
                            return;
                        }
                    }
                }

                for( let key in backgrounds ) {
                    if( backgrounds[key] === value ) {
                        this.resetSelect( name )
                        this.toasty( `"${backgrounds[key]}" is already assigned as a background, and will not provide an additional bonus` )
                        this.updateBgToState( num, '', 0 )
                        return;
                    }
                }

                // Add enhancements if they exist
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
        this.updateBgToState( num, value, cost )
    }
    updateBgToState = ( num, value, cost ) => {
        this.setState({
            backgrounds: { ...this.state.backgrounds, [num]: value },
            bgCosts: { ...this.state.bgCosts, [num]: cost }
        })
    }

    // Updates state with karmic abilities
    handleKarma( e ) {
        const { name, value } = e.target
        const { karmas } = this.state
        let num = name.split(' ')[1]

        for( let key in karmas ) {
            if( karmas[key] === value ) {
                this.toasty( `"${karmas[key]}" has already been chosen. Please pick another karmic ability` )
                this.resetSelect( name )
                this.setState({ karmas: { ...karmas, [num]: '' } })
                return;
            }
        }

        this.setState({ karmas: { ...karmas, [num]: value } })
    }

    // Updates state.learning with the skill under the appropriate bonus
    handleLearning( e, bonus ) {
        const { learning } = this.state
        let { name, value: skill } = e.target
        skill = _.camelCase(skill)

        // Do not add points if the skill is already being given points
        for( let key in learning ) {
            if( skill === learning[key] ) {
                this.toasty( `"${skill}" is already assigned to a different value and will not receive anymore points` )
                this.resetSelect( name )
                this.setState({ learning: { ...this.state.learning, [bonus]: '' } })
                learning[bonus] ? this.updateSkills( learning[bonus], -bonus ) : null
                return;
            }
        }

        // Remove the bonus when a filled slot is changed
        learning[bonus] ? this.updateSkills( learning[bonus], -bonus ) : null

        // Set a slot to be filled and apply the bonus
        this.setState({ learning: { ...this.state.learning, [bonus]: skill } })
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
    reduceToTotal = obj => {
        return _.reduce( obj, ( result, value ) => {
            if( value >= 10 )
                value = Math.floor( value / 10 )
            return result += value
        }, 0 )
    }

    // Converts from camelCase to A String Like This
    normalizeString = str => {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    resetState = () => {
        document.getElementById( 'character-form' ).reset()
        this.setState( _.cloneDeep( initialState.characterSheet ) )
    }

    resetSelect = name => {
        document.getElementsByName( name )[0].value = ''
    }

    toasty = message => {
        toast.error( message )
    }


    /////////////////////////// RENDER METHODS
    renderSkillRow( section ) {
        let skills = []
        for( let key in section ) {
            skills.push({ key, value: section[key] })
        }

        return skills.map( (skill, i) => {
            let name = this.normalizeString( skill.key )
            let color

            if( skill.value === 40 )
                color = '#e00092'
            if( skill.value < 40 )
                color = '#a8006e'
            if( skill.value < 30 )
                color = '#72004b'
            if( skill.value < 20 )
                color = '#44002d'
            if( skill.value === 10 )
                color = '#fff'

            return (
                <div key={i} style={{ color }}>
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
                <div key={i} className='each-learn'>
                    <div>{i}</div>
                    <select name={`learning ${i}`} onChange={e => this.handleLearning(e, i)} selected={this.state.learning[i]}>
                        {skillOptions}
                    </select>
                </div>
            ) )
        }

        return display
    }


    /////////////////////////// AJAX REQUESTS
    saveCharacter() {
        const { name, rank, rankPoints, gender, age, height, weight, karma, endurance, backgrounds, karmas, enhancements, skills: { personal, vehicle, intelligence, social, espionage }, learning } = this.state
        let complete = true

        if( this.reduceToTotal(this.state.bgCosts) > 5 ) {
            complete = false
            this.toasty( 'You have too many backgrounds! Please limit your background cost to 5' )
        }

        if( name === '' || gender === '' || age === '' || height === '' || weight === '' )
            complete = false

        // _.values( backgrounds ).forEach( bg => bg === '' ? complete = false : null )
        this.reduceToTotal(this.state.bgCosts) < 5 ? complete = false : null
        _.values( karmas ).forEach( karma => karma === '' ? complete = false : null )
        _.values( learning ).forEach( learn => learn === '' ? complete = false : null )

        console.log( complete )

        // let body = {
        //     name, rank, rankPoints, gender, age, height, weight, karma, endurance, backgrounds, karmas, enhancements, personal, vehicle, intelligence, social, espionage
        // }

        // axios.post( '/api/addCharacter', body )
        //     .then( () => console.log( 'Your character has been saved') )
    }

    render() {
        let flatEnhance = _.flattenDeep( this.state.enhancements )
        let bgOptions = data.backgrounds.map( (bg, i) => <option key={i} value={bg}>{bg}</option> )
        let karmaOptions = data.karma.map( (karma, i) => <option key={i} value={karma}>{karma}</option> )
        let enhancementList = flatEnhance.map( (enhance, i) => <div key={i}>{enhance}</div> )

        let costStyle ='#fff'
        if( this.reduceToTotal(this.state.bgCosts) > 5 )
            costStyle = '#ff4848'

        return (
            <div className='character-main'>
                <Header>

                </Header>

                <ToastContainer transition={Slide} autoClose={3000} style={{ fontSize: '12px', top: '30px' }} />

                <form id='character-form' className='character-body' autoComplete='off'>
                    <input placeholder='Character Name' name='name' onChange={e => this.handleInfo(e)} />
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
                        <input placeholder='Gender' name='gender' onChange={e => this.handleInfo(e)} />
                        <input placeholder='Age' type='number' name='age' onChange={e => this.handleInfo(e)} />
                        <input placeholder='Height' name='height' onChange={e => this.handleInfo(e)} />
                        <input placeholder='Weight' name='weight' onChange={e => this.handleInfo(e)} />
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
                        <select id='test-id' name='bgCosts two' onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <select name='bgCosts three' onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <select name='bgCosts four' onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <select name='bgCosts five' onChange={e => this.handleBg(e)}>{bgOptions}</select>
                        <div className='bgs-total' style={{color: costStyle}}>Cost: {this.reduceToTotal(this.state.bgCosts)}/5</div>
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
                        {/* Enhancements */}
                        <div className='character-enhance'>
                            <div>Enhancements</div>
                            <div className='enhancement-list'>{enhancementList}</div>
                        </div>
                    </section>

                    {/* Independent Learning */}
                    <section className='character-learning'>
                        <div>Independent Learning:</div>
                        {this.renderLearning()}
                    </section>
                </form>

                <section className='character-buttons'>
                    <button id='character-reset' onClick={() => this.resetState()}>Reset</button>
                    <button id='character-save' onClick={() => this.saveCharacter()}>Save</button>
                </section>

            </div>
        )
    }
}

export default CharacterSheet;