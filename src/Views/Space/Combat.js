import React, { Component } from 'react';
import _ from 'lodash';
import Ship from '../../components/Ship/Ship';
import Header from '../../components/Header/Header';
import lists from '../../data/items';
import './combat.css';

class Space extends Component {
    constructor() {
        super();

        this.state = {
            shipToCreate: '',
            visible: [],
            background: 'space-main',
            tipOverlay: false
        }
    }

    setMap( name ) {
        this.setState({ background: name })
    }

    createShip( name ) {
        const { spaceships } = lists
        for( let key in spaceships ) {
            if( key === name ) {
                let ship = spaceships[key]
                ship.index = this.state.visible.length
                this.setState({
                    visible: [...this.state.visible, ship]
                })
            }
        }    
    }

    displayTips() {
        this.setState({ tipOverlay: !this.state.tipOverlay })
    }

    renderShips() {
        return this.state.visible.map( ( ship, i ) => {
            return <Ship ship={ship} key={i} />
        } )
    }

    render() {
        const shipOptions = lists.names.map( ( name, i ) => {
            return <option key={i} className='option-dropdown' value={_.camelCase(name)}>{name}</option>
        })
        const mapOptions = lists.maps.map( ( name, i ) => {
            let displayName = name.split('-')[0]
            return <option key={i} className='option-dropdown' value={name.toLowerCase()}>{displayName}</option>
        } )

        return (
            <div className={this.state.background}>
                <Header>
                    <select className='select-box' onChange={e => this.setMap(e.target.value)}>
                        {mapOptions}
                    </select>
                    <select className='select-box' value='Select a Spaceship' onChange={e => this.createShip(e.target.value)}>
                        {shipOptions}
                    </select>
                    <button className='tips-button' onClick={() => this.displayTips()}>Show Tips</button>
                </Header>
                <section className='combat-content'>
                    {this.renderShips()}
                    <div className={this.state.tipOverlay ? 'combat-tips' : ''}>

                    </div>
                </section>
            </div>
        )
    }
}

export default Space;