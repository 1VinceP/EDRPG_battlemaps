import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { updateShipPos, changeSides, handleName, handleActive } from '../../redux/reducer';
import './ship.css';

class Ship extends Component {
    state = {
        side: 'friendly',
        name: '',
        active: ''
    }

    componentDidMount() {
        const { side, name, active } = this.props.ship

        this.setState({ side, name, active })
    }

    handleDrag = (e, ui) => {
        const { x, y } = this.props.ship.deltaPosition

        this.props.updateShipPos( { id: this.props.ship.index, x: x + ui.deltaX, y: y + ui.deltaY } )
    }

    changeSides() {
        const { index, side } = this.props.ship

        if( side === 'friendly' ) {
            this.props.changeSides( index, 'enemy' )
            this.setState({ side: 'enemy' })
        }
        else {
            this.props.changeSides( index, 'friendly' )
            this.setState({ side: 'friendly' })
        }
    }

    handleName( e ) {
        this.setState({ name: e.target.value })
    }

    deleteShip() {
        const { index } = this.props.ship

        this.setState({ active: 'ship-deleted' })
        this.props.handleActive( index, 'ship-deleted' )
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
            top: '30px',
            left: '30px',
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

        const { deltaPosition: { x, y } } = ship
        return (
            <Draggable bounds='parent' handle='.ship-handle' onDrag={this.handleDrag} defaultPosition={{x, y}}>
                <div className={`${this.state.side} ${this.state.active}`} style={style}>
                    <div className='ship-handle' style={styleBg} />
                    <input style={styleInput} value={this.state.name} onChange={e => this.handleName(e)} onBlur={() => this.props.handleName( ship.index, this.state.name )} />
                    <button className='ship-change' style={styleButton} onClick={() => this.changeSides()}>Change sides</button>
                    <button className='ship-change ship-delete' style={styleButton} onClick={() => this.deleteShip( ship.index )}>Remove</button>
                </div>
            </Draggable>
        )
    }
}

function mapStateToProps( state ) {
    const { deltaPosition } = state;

    return {
        deltaPosition
    };
}

export default connect( null, { updateShipPos, changeSides, handleName, handleActive } )(Ship);