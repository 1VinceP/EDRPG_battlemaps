import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Portal } from 'semantic-ui-react';
import _ from 'lodash';
import karmaData from '../../data/karma.json';
import skillData from '../../data/characterData';
import SkillBooster from '../../components/SkillBooster/SkillBooster';
import RankUpPage1 from './RankUpPage1';
import styles from './RankUpStyles';

class RankUp extends Component {
   static propTypes = {
      applyRankUp: PropTypes.func.isRequired,
      character: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
      open: PropTypes.bool,
   }

   static defaultProps = {
      applyRankUp: () => {},
      character: {},
      name: '',
      open: false,
   }

   state = {
      portalOpen: false,
      newKarma: null,
      newEndurance: null,
      values: [2, 6, 6, 5, 4],
      boostedSkills: [],
      currentPage: 1
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

   handleSkills(e, val, index) {
      const { boostedSkills } = this.state;
      let { name, value: skill } = e.target;
      skill = _.camelCase(skill)

      let newBoostedSkills = [...boostedSkills]
      newBoostedSkills[index] = skill

      this.setState({
         boostedSkills: newBoostedSkills
      })
   }

   renderSkills() {
      return this.state.values.map((num, i) => {
         return (
            <SkillBooster
               key={i}
               skills={skillData.skills}
               index={i}
               val={num}
               change={(e, val, index) => this.handleSkills(e, val, index)}
            />
         )
      })
   }

   renderPage() {
      const { currentPage } = this.state
      const { character } = this.props

      return currentPage === 1
         ? <RankUpPage1 {...this.state} character={character} />
         : null
   }

   decreasePage() {
      if (this.state.currentPage > 1) {
         this.setState({ currentPage: --this.state.currentPage })
      }
   }

   increasePage() {
      if (this.state.currentPage < 3) {
         this.setState({ currentPage: ++this.state.currentPage })
      }
   }

   render() {
      const { currentPage, newEndurance, newKarma } = this.state
      const { character } = this.props;
      const {
         portalButton, rankBg, rankModal
      } = this.props.classes;

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
                  <h1 className='character-name'>{character.name}</h1>
                  <div className='main-increase'>
                     <div className='endurance'>Endurance: {character.max_endurance} -> {newEndurance}</div>
                     <div className='karma'>Karma: {character.max_karma} -> {newKarma}</div>
                  </div>
                  {this.renderPage()}
                  <p>You may enter your own rolled values, or copy and paste from the dice roller in the slide-out menu into the box below. Separate numbers with spaces</p>
                  <input onChange={e => this.setState({ values: e.target.value.split(' ') })} />
                  {this.renderSkills()}
                  <button onClick={() => this.props.applyRankUp()}>Apply Rank Up</button>
                  <button onClick={() => this.handlePortal()}>Cancel Rank Up</button>
                  <div className='rank-pagination'>
                     {currentPage > 1 && <button onChange={this.decreasePage}>{'<'}</button>}
                     {currentPage < 3 && <button onChange={this.increasePage}>{'>'}</button>}
                  </div>
               </div>
            </div>
         </Portal>
      )
   }
}

export default injectSheet(styles)(RankUp);