import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Portal } from 'semantic-ui-react';
import _ from 'lodash';
import karmaData from '../../data/karma.json';
import skillData from '../../data/characterData';
import SkillBooster from '../../components/SkillBooster/SkillBooster';
import styles from './RankUpStyles';

class RankUp extends Component {
    static propTypes = {
        character: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        open: PropTypes.bool,
        applyRankUp: PropTypes.func.isRequired
    }

    state = {
        portalOpen: false,
        newKarma: null,
        newEndurance: null,
        values: [2, 6, 6, 5, 4],
        boostedSkills: []
    }

    handleOpen() {
        this.setState({
            portalOpen: true,
            newKarma: this.props.character.max_karma + 1 || this.props.character.karma + 1,
            newEndurance: this.props.character.max_endurance + 5 || this.props.character.endurance + 5
        })
    }

    handlePortal() {
        this.setState({ portalOpen: !this.state.portalOpen })
    }

    handleSkills( e, val, index ) {
        const { boostedSkills } = this.state;
        let { name, value: skill } = e.target;
        skill = _.camelCase(skill)

        console.log({ name, skill, val, index })

        for( let key in boostedSkills ) {
            if( skill === boostedSkills[key] ) {
                this.setState({ boostedSkill: {...this.state.boostedSkill, [val]: ''} })
            }
        }
    }

    renderSkills() {
        return this.state.values.map( (num, i) => {
            return <SkillBooster
                        key={i}
                        skills={skillData.skills}
                        index={i}
                        val={num}
                        change={(e, val, index) => this.handleSkills(e, val, index)}
                    />
        } )
    }

    render() {
        const { character } = this.props;
        const { portalButton, rankBg, rankModal } = this.props.classes;

        return (
            <Portal
                closeOnTriggerClick
                openOnTriggerClick
                closeOnDocumentClick={false}
                trigger={<button className={portalButton}>Rank up {this.props.name}</button>}
                onOpen={() => this.handleOpen()}
                onClose={() => this.setState({ portalOpen: false })}
                open={this.state.portalOpen}
            >
                <div className={rankBg}>
                    <div className={rankModal}>
                        <h1>{character.name}</h1>
                        <div>New Karma Max: {this.state.newKarma}</div>
                        <div>New Endurance Max: {this.state.newEndurance}</div>
                        <p>You may enter your own rolled values, or copy and paste from the dice roller in the slide-out menu into the box below.</p>
                        <input onChange={e => this.setState({ values: e.target.value.split(' ') })} />
                        {this.renderSkills()}
                        <button onClick={() => this.props.applyRankUp()}>Apply Rank Up</button>
                        <button onClick={() => this.handlePortal( this.state.newEndurance, this.state.newKarma, this.state.boostedSkills )}>Close Rank Up</button>
                    </div>
                </div>
            </Portal>
        )
    }
}

export default injectSheet(styles)(RankUp);