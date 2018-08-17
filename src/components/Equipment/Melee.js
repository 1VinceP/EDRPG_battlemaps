import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAlias } from '../../redux/characterReducer';

class Melee extends Component {
    state = {
        showEdit: false
    }

    handleEdit( e ) {
        e.stopPropagation()
        this.setState({ showEdit: !this.state.showEdit })
    }

    updateAlias( e ) {
        this.props.updateAlias( this.props.details.id, this.props.weapons, e.target.value, 'melee_weapons' )
    }

    render() {
        const { name, alias, bonus, finesse, damage, notes, cost } = this.props.details
        const { showEdit } = this.state

        return (
            <div className='equip-item' >
                <section className='ei-left'>
                    <div className='ei-name'>
                        { alias || showEdit ? <div style={{fontSize: '8px'}}>{name}</div> : null }
                        { showEdit
                            ? <input onChange={e => this.updateAlias(e)} onClick={e => e.stopPropagation()} value={alias} />
                            : alias || name
                        }
                    </div>
                </section>

                <section className='ei-right'>
                    <div className='ei-top'>
                        <div className='ei-bonus'>+{bonus}</div>
                        <div className='ei-m-finesse'>{finesse}</div>
                        <div className='ei-damage'>{damage}</div>
                        <div className='ei-cost'>{cost} Cr</div>
                    </div>

                    <div className='ei-bottom'>
                        <div className='ei-notes'>Notes: {notes}</div>
                        <button className='ei-bottom-button' onClick={e => this.handleEdit(e)}>{showEdit ? 'Save' : 'Edit'} Nickname</button>
                    </div>
                </section>

            </div>
        )
    }
}

export default connect( null, { updateAlias } )(Melee)