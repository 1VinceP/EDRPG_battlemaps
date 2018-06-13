import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './ship.css';

class Ship extends Component {
    state = {
        side: 'friendly',
        name: '',
        active: ''
    }

    componentDidMount() {
        this.setState({ name: this.props.ship.name })
    }

    onClick() {
        this.state.side === 'friendly'
        ? this.setState({ side: 'enemy' })
        : this.setState({ side: 'friendly' })
    }

    handleChange( e ) {
        this.setState({
            name: e.target.value
        })
    }

    deleteShip() {
        this.setState({
            active: 'ship-deleted'
        })
    }

    render() {
        const { ship } = this.props

        let inputWidth = ship.size === 's' || ship.size === 'slf' ? '200%' : '130%'
        let inputOffset = ship.size === 's' || ship.size === 'slf' ? '-50%' : '-15%'

        let style = {
            height: ship.height,
            width: ship.width,
            color: 'white',
            position: 'absolute',
            // border: '1px solid #0f0',
            top: '20px',
            left: '2px',
            zIndex: 1,
            paddingBottom: '3px'
        }
        let styleBg = {
            height: '100%',
            width: '100%',
            background: `url( ${ship.image} ) no-repeat`,
            backgroundSize: 'contain'
        }
        let styleButton = {
            height: '18px',
            width: inputWidth,
            marginLeft: inputOffset,
            background: 'rgba(0, 0, 0, 0.6)',
            outline: 'none',
            color: '#ccc',
            borderRadius: '0, 0, 7px 7px',
        }
        let styleInput = {
            height: '18px',
            width: inputWidth,
            marginTop: '3px',
            marginLeft: inputOffset,
            background: 'none',
            border: 'none',
            outline: 'none',
            borderBottom: this.state.side === 'friendly' ? '1px solid #0f0' : '1px solid #f00',
            color: '#fff',
            textAlign: 'center',
            fontSize: '12px'
        }

        return (
            <Draggable bounds='parent' handle='.ship-handle'>
                <div className={`${this.state.side} ${this.state.active}`} style={style}>
                    <div className='ship-handle' style={styleBg} />
                    <input style={styleInput} value={this.state.name} onChange={e => this.handleChange(e)} />
                    <button className='ship-change' style={styleButton} onClick={() => this.onClick()}>Change sides</button>
                    <button className='ship-change ship-delete' style={styleButton} onClick={() => this.deleteShip( ship.index )}>Remove</button>
                </div>
            </Draggable>
        )
    }
}

export default Ship;