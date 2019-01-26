import React, { Component } from 'react';
import Draggable from 'react-draggable';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
   updateShipPos, changeSides, handleName, handleActive
} from '../../redux/shipReducer';
import styles from './shipStyles';

class Ship extends Component {
   static propTypes = {
      updateShipPos: PropTypes.func,
      changeSides: PropTypes.func,
      handleName: PropTypes.func,
      handleActive: PropTypes.func,
      ship: PropTypes.object,
   }

   static defaultProps = {
      updateShipPos: () => {},
      changeSides: () => {},
      handleName: () => {},
      handleActive: () => {},
      ship: {},
   }

   state = {
      side: 'friendly',
      name: '',
      active: '',
   }

   componentDidMount() {
      const { ship: { side, name, active } } = this.props;

      this.setState({ side, name, active });
   }

   handleDrag = (e, ui) => {
      const {
         ship: {
            index,
            deltaPosition: { x, y },
         },
         updateShipPos,
      } = this.props;

      updateShipPos({
         id: index,
         x: x + ui.deltaX,
         y: y + ui.deltaY
      });
   }

   changeSides() {
      const { ship: { index, side } } = this.props;

      if (side === 'friendly') {
         this.props.changeSides(index, 'enemy');
         this.setState({ side: 'enemy' });
      }
      else {
         this.props.changeSides(index, 'friendly');
         this.setState({ side: 'friendly' });
      }
   }

   handleName(e) {
      this.setState({ name: e.target.value });
   }

   deleteShip() {
      const {
         ship: { index },
         handleActive,
      } = this.props;

      this.setState({ active: 'ship-deleted' });
      handleActive(index, 'ship-deleted');
   }

   render() {
      const { classes, ship } = this.props;
      const { deltaPosition: { x, y } } = ship;
      const {
         friendly, enemy, style, styleBg, styleButton,
         shipDeleted, shipChange, styleInput,
      } = classes;

      const side = this.state.side === 'friendly'
         ? friendly
         : enemy;
      const active = this.state.active === 'ship-deleted'
         ? shipDeleted
         : '';

      return (
         <Draggable
            bounds='parent'
            handle='.ship-handle'
            onDrag={this.handleDrag}
            defaultPosition={{ x, y }}
         >
            <div className={`${side} ${active} ${style}`}>
               <div className={`ship-handle ${styleBg}`} />
               <input
                  className={styleInput}
                  value={this.state.name}
                  onChange={e => this.handleName(e)}
                  onBlur={() => this.props.handleName(ship.index, this.state.name)}
               />
               <button
                  className={`${shipChange} ${styleButton}`}
                  onClick={() => this.changeSides()}
               >
                  Change sides
               </button>
               <button
                  className={`${shipChange} ${styleButton}`}
                  onClick={() => this.deleteShip(ship.index)}
               >
                  Remove
               </button>
            </div>
         </Draggable>
      )
   }
}

const actions = {
   updateShipPos,
   changeSides,
   handleName,
   handleActive,
}

export default injectSheet(styles)(connect(null, actions)(Ship));