import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { addShip, changeBackground } from '../../redux/shipReducer';
import { OutlineButton } from '../../components/common';
import Ship from '../../components/Ship/Ship';
import Header from '../../components/Header/Header';
import Tips from '../../components/Tips/Tips';
import lists from '../../data/items';
import styles from './combatStyles';

class Combat extends Component {
   state = {
      shipToCreate: '',
      tipOverlay: false
   }

   createShip(name) {
      const { spaceships } = lists
      for (let key in spaceships) {
         if (key === name) {
            let ship = { ...spaceships[key] }
            let index = this.props.visible.length
            this.props.addShip(ship, index)
         }
      }
   }

   displayTips() {
      this.setState({ tipOverlay: !this.state.tipOverlay })
   }

   renderShips() {
      return this.props.visible.map((ship, i) => {
         return <Ship ship={ship} key={i} />
      })
   }

   render() {
      const { classes, combatBg, changeBackground } = this.props;
      const {
         optionDropdown, selectBox, combatContent, space, land, mixed,
      } = classes;

      const map = combatBg === 'space'
         ? space
         : combatBg === 'land'
         ? land
         : mixed

      const mapOptions = lists.maps.map((name, i) => {
         return <option key={i} className={optionDropdown} value={name.toLowerCase()}>{name}</option>
      })
      const shipOptions = lists.shipNames.map((name, i) => {
         return <option key={i} className={optionDropdown} value={_.camelCase(name)}>{name}</option>
      })
      const vehicleOptions = lists.vehicleNames.map((name, i) => {
         return <option key={i} className={optionDropdown} value={_.camelCase(name)}>{name}</option>
      })

      return (
         <div className={map}>
            <Header>
               <select className={selectBox} onChange={e => changeBackground(e.target.value)}>
                  {mapOptions}
               </select>
               <select className={selectBox} value='Select a Spaceship' onChange={e => this.createShip(e.target.value)}>
                  {shipOptions}
               </select>
               {/* <select className={selectBox} value='Select a Vehicle' onChange={e => this.createShip(e.target.value)}>
                  {vehicleOptions}
               </select> */}
               <OutlineButton onClick={() => this.displayTips()} size={{ w: 150, h: '100%' }}>
                  {this.state.tipOverlay ? 'Hide Tips' : 'Show Tips'}
               </OutlineButton>
            </Header>
            <section className={combatContent}>
               {this.renderShips()}
               <div className={this.state.tipOverlay ? 'combat-tips' : 'hide-tips'}>
                  <Tips />
               </div>
            </section>
         </div>
      )
   }
}

function mapStateToProps(state) {
   let { visible, combatBg } = state.ship;

   return {
      visible,
      combatBg
   };
}

export default injectSheet(styles)(connect(mapStateToProps, { addShip, changeBackground })(Combat));