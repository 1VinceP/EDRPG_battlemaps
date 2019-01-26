import React, { Component } from 'react';
import injectSheet from 'react-jss';
import styles from './dicerollerStyles';

class DiceRoller extends Component {
   state = {
      dieType: 10,

      diceAmount: 0,
      diceResults: [],
      diceTotal: 0
   }

   handleDieType(e) {
      this.setState({ dieType: e.target.value })
   }

   handleChange(e) {
      this.setState({ diceAmount: e.target.value })
   }

   onEnter(e) {
      if (e.which === 13) {
         this.rollDice()
      }
   }

   rollDice() {
      const { dieType, diceAmount } = this.state
      let results = []

      for (let i = 0; i < diceAmount; i++) {
         let val = Math.floor(Math.random() * dieType) + 1
         results.push(val)
      }

      let total = results.reduce((t, c) => t += c, 0)

      this.setState({
         diceResults: results,
         diceTotal: total
      })
   }

   render() {
      const { diceRoller, input, results } = this.props.classes;

      let mappedDice = this.state.diceResults
         .sort((a, b) => a - b).map((die, i) => <div key={i}>{die}</div>)

      return (
         <div className={diceRoller}>
            <div className={input}>
               <div className='input-header'>
                  Enter # of d
                  <input
                     className='die-type'
                     value={this.state.dieType}
                     onChange={e => this.handleDieType(e)}
                  />
                  's to roll
               </div>
               <div className='input-content'>
                  <input
                     type='number'
                     value={this.state.diceAmount}
                     onChange={e => this.handleChange(e)}
                     onKeyPress={e => this.onEnter(e)}
                  />
                  <button onClick={() => this.rollDice()}>Roll</button>
               </div>
            </div>
            {this.state.diceTotal
               ? <div className={results}>
                  <div className='total'>Total: {this.state.diceTotal}</div>
                  <div className='die'>{mappedDice}</div>
               </div>
               : null
            }
         </div>
      )
   }
}

export default injectSheet(styles)(DiceRoller);