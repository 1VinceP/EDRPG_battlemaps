import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { ToastContainer, Slide, toast } from 'react-toastify';
import Header from '../../components/Header/Header';
import data from '../../data/characterData';
import karmaData from '../../data/karma.json';
import initialState from '../../data/initialStates';
import 'react-toastify/dist/ReactToastify.css';
import './createCharacter.css';


class CreateCharacter extends Component {
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
                kineticWeapons: 10,
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
        karmas: { one: 'escapeDeath', two: '', three: '', four: '' },
        enhancements: [],
        learning: { 10: '', 9: '', 8: '', 7: '', 6: '', 5: '', 4: '', 3: '', 2: '', 1: '' },
        rangedWeapons: '',
        meleeWeapons: '',
        grenades: '',
        equipment: ''
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
        let flatEnhance = _.flattenDeep( enhancements )
        let newEnhance = []
        let cost

        for( let key in backgroundStats ) {
            if( key === _.camelCase( value ) ) {

                // Remove the skill bonus when a filled slot is changed
                if( backgrounds[num] ) {
                    let oldBg = _.camelCase(backgrounds[num])
                    if( backgroundStats[oldBg].hasOwnProperty( 'enhancements' ) ) {
                        for( let i = 0; i < backgroundStats[oldBg].enhancements.length; i++ ) {
                            for( let j = flatEnhance.length; j >= 0; j-- ) {
                                if( flatEnhance[j] === backgroundStats[oldBg].enhancements[i] )
                                    flatEnhance.splice( j, 1 )
                            }
                        }
                        this.setState({ enhancements: flatEnhance }) // Remove enhancements
                    }
                    backgroundStats[oldBg].bonuses[10].forEach( skill => this.updateSkills( skill, -10 )) // Remove +10 bonuses
                    backgroundStats[oldBg].bonuses[20].forEach( skill => this.updateSkills( skill, -20 )) // Remove +20 bonuses
                    for( let prop in backgrounds ) {
                        if( backgrounds[prop] === value ) {
                            this.resetSelect( name )
                            this.toasty( `"${backgrounds[prop]}" is already assigned as a background, and will not provide an additional bonus` )
                            this.updateBgToState( num, '', 0 )
                            return;
                        }
                    }
                }

                for( let prop in backgrounds ) {
                    if( backgrounds[prop] === value ) {
                        this.resetSelect( name )
                        this.toasty( `"${backgrounds[prop]}" is already assigned as a background, and will not provide an additional bonus` )
                        this.updateBgToState( num, '', 0 )
                        return;
                    }
                }

                // Add enhancements if they exist
                if( backgroundStats[key].hasOwnProperty( 'enhancements' ) ) {
                    this.setState({ enhancements: [...flatEnhance, backgroundStats[key].enhancements] })
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

        for( let key in this.state.skills ) { // Loop through the skill headings
            for( let prop in this.state.skills[key] ) { // Loop through the individual skills of each heading
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

    // Resets state back to its empty values
    resetState = () => {
        document.getElementById( 'character-form' ).reset()
        this.setState( _.cloneDeep( initialState.characterSheet ) )
    }

    // Resets a specific select value
    resetSelect = name => {
        document.getElementsByName( name )[0].value = ''
    }

    // Throws a toast notification
    toasty = message => {
        toast.error( message )
    }

    findFalse( arr ) {
        console.log( arr )
        for( let i = 0; i < arr.length; i++ ) {
            if( !arr[i] ) return false;
        }

        return true;
    }


    /////////////////////////// RENDER METHODS
    renderSkillRow( section ) {
        let skills = []
        for( let key in section ) {
            skills.push({ key, value: section[key] })
        }

        return skills.map( (skill, i) => {
            let name = this.normalizeString( skill.key )
            let showSkillValue = skill.value
            if( showSkillValue > 40 )
                showSkillValue = 40

            let color
            if( skill.value > 40 )
                color = '#ff4848'
            if( skill.value === 40 )
                color = '#54e4fd'
            if( skill.value < 40 )
                color = '#189AD3'
            if( skill.value < 30 )
                color = '#005073'
            if( skill.value < 20 )
                color = '#46545a'
            if( skill.value <= 10 )
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
        let skillOptions = _.orderBy( data.skills ).map( (skill, i) => <option key={i} value={skill}>{skill}</option> )
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
        const { name, rank, rankPoints, gender, age, height, weight, karma, endurance, backgrounds, karmas, enhancements, skills, skills: { personal, vehicle, intelligence, social, espionage }, learning, rangedWeapons, meleeWeapons, grenades, equipment } = this.state
        let acceptOver50 = true
        , completeInfo = false
        , completeBg = false
        , completeKarma = this.findFalse( _.values( karmas ) )
        , completeLearning = this.findFalse( _.values( learning ) )
        , completeRangedWeapons = false

        // Check that backgrounds costs to not exceed 5
        if( this.reduceToTotal(this.state.bgCosts) > 5 ) {
            this.toasty( 'You have too many backgrounds! Please limit your background cost to 5' )
            return;
        }

        // Check that input values are not empty
        if( name === '' || gender === '' || age === '' || height === '' || weight === '' )
            completeInfo = false
        else
            completeInfo = true

        if( !rangedWeapons )
            completeRangedWeapons = false
        else
            completeRangedWeapons = true

        // Check that dropdown values are not empty
        this.reduceToTotal(this.state.bgCosts) < 5 ? completeBg = false : completeBg = true

        // Throw alert if one or more skills is greater than 40
        for( let key in skills ) {
            for( let prop in skills[key] ) {
                if( skills[key][prop] > 40 ) {
                    acceptOver50 = window.confirm( 'You have one or more skill values over 40 when the limit is 40. If you are not ok with losing the extra points, press "cancel".' )
                }
            }
        }

        if( !acceptOver50 )
            return;

        if( !completeInfo || !completeBg || !completeKarma || !completeLearning ) {
            console.log( completeInfo, completeBg, completeKarma, completeLearning )
            this.toasty( 'It looks like you left something empty. Please go back and make sure everything is filled in.' )
            return;
        }

        if( !completeRangedWeapons ) {
            this.toasty( 'Please choose whether you would prefer Auto Pistols or Laser Pistols' )
            return;
        }

        let rangedArr = [rangedWeapons, rangedWeapons]
        let meleeArr = ['fighting', meleeWeapons]

        let body = {
            name, rank, rankPoints, gender, age, height, weight, karma, endurance, backgrounds, karmas, enhancements, personal, vehicle, intelligence, social, espionage, rangedArr, meleeArr, grenades, equipment
        }

        axios.post( `/api/addCharacter/${this.props.user.userid}`, body )
            .then( () => {
                console.log( 'Your character has been saved')
                this.props.history.push('/playercharacters')
            } )
    }

    render() {
        let flatEnhance = _.flattenDeep( this.state.enhancements )
        let bgOptions = data.backgrounds.map( (bg, i) => <option key={i} value={bg}>{bg}</option> )
        let karmaOptions = karmaData.karmaNames.map( (karma, i) => <option key={i} value={_.camelCase(karma)}>{this.normalizeString(karma)}</option> )
        let enhancementList = flatEnhance.map( (enhance, i) => <div key={i}>{this.normalizeString(enhance)}</div> )

        let costStyle ='#fff'
        if( this.reduceToTotal(this.state.bgCosts) > 5 )
            costStyle = '#ff4848'

        return (
            <div className='character-main'>
                <Header />

                <ToastContainer transition={Slide} autoClose={3000} style={{ fontSize: '12px', top: '30px' }} />

                { !this.props.user.userid
                    ? <div className='character-no-user'>
                        You are not logged in. Changes made to this page will not be saved.
                    </div>
                    : null
                }

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

                    <section className='character-equipment'>
                        <div>Equipment:</div>

                        <select name='rangedWeapons' onChange={e => this.handleInfo(e)}>
                            <option value=''></option>
                            <option value='autopistol'>Autopistols</option>
                            <option value='laser pistol'>Laser Pistols</option>
                        </select>

                        <select name='equipment' onChange={e => this.handleInfo(e)}>
                            <option value=''></option>
                            <option value='hand comm'>Hand Comm</option>
                            <option value='wrist comm'>Wrist Comm</option>
                        </select>

                        <select name='meleeWeapons' onChange={e => this.handleInfo(e)} disabled={this.state.skills.personal.meleeWeapons < 20}>
                            <option value=''></option>
                            <option value='knife'>Knife</option>
                            <option value='sledgehammer'>Sledgehammer</option>
                            <option value='sword'>Sword</option>
                        </select>

                        <select name='grenades' onChange={e => this.handleInfo(e)} disabled={this.state.skills.personal.grenade < 20}>
                            <option value=''></option>
                            <option value='frag grenade'>Fragmentation Grenade</option>
                        </select>
                    </section>
                </form>

                <section className='character-buttons'>
                    <button id='character-reset' onClick={() => this.resetState()}>Reset</button>
                    <button id='character-save' onClick={() => this.saveCharacter()} disabled={!this.props.user.userid}>Save</button>
                </section>

            </div>
        )
    }
}

function mapStateToProps( state ) {
    const { user } = state.auth;

    return { user };
}

export default connect( mapStateToProps, {} )(CreateCharacter);