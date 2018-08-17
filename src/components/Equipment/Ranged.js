import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fireWeapon, reloadWeapon, updateAlias } from '../../redux/characterReducer';

class Ranged extends Component {
        state = {
            showEdit: false,
        };

    handleEdit( e ) {
        e.stopPropagation()
        this.setState({ showEdit: !this.state.showEdit })
    }

    updateAlias( e ) {
        this.props.updateAlias( this.props.details.id, this.props.weapons, e.target.value, 'ranged_weapons' )
    }

    render() {
        const { showEdit } = this.state
        const { details, index, weapons, fireWeapon, reloadWeapon } = this.props
        const { id, name, bonus, sr, sd, mr, md, lr, ld, damage, current_ammo, ammo, cost, notes, alias } = details
        // console.log( details )

        return (
            <div className='equip-item'>
                <section className='ei-left'>
                    <div className='ei-name' onClick={() => fireWeapon(id, weapons)}>
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
                        <div className='ei-r-ranges'>
                            <div>{sr}m ({sd})</div>
                            <div>{mr}m ({md})</div>
                            <div>{lr}m ({ld})</div>
                        </div>
                        <div className='ei-damage'>{damage}</div>
                        <div className='ei-ammo' onClick={() => reloadWeapon(id, weapons)}>
                            {current_ammo !== null && `${current_ammo} / `}{ammo}
                        </div>
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

export default connect( null, { fireWeapon, reloadWeapon, updateAlias } )(Ranged);