import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addShip, changeBackground } from '../../redux/shipReducer';
import Ship from '../../components/Ship/Ship';
import Header from '../../components/Header/Header';
import Tips from '../../components/Tips/Tips';
import lists from '../../data/items';
import './combat.css';

class Combat extends Component {
    state = {
        shipToCreate: '',
        background: 'space-main',
        tipOverlay: false
    }

    setMap( name ) {
        this.setState({ background: name })
    }

    createShip( name ) {
        const { spaceships } = lists
        for( let key in spaceships ) {
            if( key === name ) {
                let ship = {...spaceships[key]}
                let index = this.props.visible.length
                this.props.addShip( ship, index )
            }
        }
    }

    displayTips() {
        this.setState({ tipOverlay: !this.state.tipOverlay })
    }

    renderShips() {
        return this.props.visible.map( ( ship, i ) => {
            return <Ship ship={ship} key={i} />
        } )
    }

    render() {
        const mapOptions = lists.maps.map( ( name, i ) => {
            let displayName = name.split('-')[0]
            return <option key={i} className='option-dropdown' value={name.toLowerCase()}>{displayName}</option>
        } )
        const shipOptions = lists.shipNames.map( ( name, i ) => {
            return <option key={i} className='option-dropdown' value={_.camelCase(name)}>{name}</option>
        })
        const vehicleOptions = lists.vehicleNames.map( ( name, i ) => {
            return <option key={i} className='option-dropdown' value={_.camelCase(name)}>{name}</option>
        } )

        return (
            <div className={this.props.combatBg}>
                <Header>
                    <select className='select-box' onChange={e => this.props.changeBackground(e.target.value)}>
                        {mapOptions}
                    </select>
                    <select className='select-box' value='Select a Spaceship' onChange={e => this.createShip(e.target.value)}>
                        {shipOptions}
                    </select>
                    {/* <select className='select-box' value='Select a Vehicle' onChange={e => this.createShip(e.target.value)}>
                        {vehicleOptions}
                    </select> */}
                    <button className='tips-button' onClick={() => this.displayTips()}>{this.state.tipOverlay ? 'Hide Tips' : 'Show Tips'}</button>
                </Header>
                <section className='combat-content'>
                    {this.renderShips()}
                    <div className={this.state.tipOverlay ? 'combat-tips' : 'hide-tips'}>
                        <Tips />
                    </div>
                </section>
            </div>
        )
    }
}

function mapStateToProps( state ) {
    let { visible, combatBg } = state.ship;

    return {
        visible,
        combatBg
    };
}

export default connect( mapStateToProps, { addShip, changeBackground } )(Combat);