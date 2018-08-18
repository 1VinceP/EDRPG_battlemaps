import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fireWeapon, reloadWeapon, updateAlias, importCharacter } from '../../redux/characterReducer';

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

    sellEquipment( id, cost, credits, userid, uid, cid ) {
        let value = prompt('Sell value (standard 70% of purchase cost)', Math.ceil(cost * .7))

        if( value ) {
            value = value * 1 + credits * 1
            axios.delete(`/api/deleteRanged/${userid}/${uid}/${cid}/${id}?value=${value}`)
                .then( () => {
                    this.props.importCharacter( cid, this.props.name )
                } )
        }
    }

    render() {
        const { showEdit } = this.state
        const { details, index, weapons, userid, uid, cid, credits, fireWeapon, reloadWeapon, sellEquipment } = this.props
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
                        <div className='ei-cost' onClick={() => this.sellEquipment(id, cost, credits, userid, uid, cid)}>{cost} Cr</div>
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

function mapStateToProps( state ) {
    const { userid } = state.auth.user;
    const { userid: uid, cid, credits, name } = state.character.character

    return {
        userid,
        uid,
        cid,
        credits,
        name
    };
}

export default connect( mapStateToProps, { fireWeapon, reloadWeapon, updateAlias, importCharacter } )(Ranged);