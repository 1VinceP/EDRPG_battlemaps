import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateAlias, importCharacter } from '../../redux/characterReducer';

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

    sellEquipment( id, cost ) {
        const { userid, uid, cid, credits } = this.props

        if( userid == uid ) { // Check if user is logged in and owns the character
            if( id != 1 ) {
                console.log( id )
                let value = prompt('Sell value (standard 70% of purchase cost)', Math.round(cost * .7))

                if( value && credits !== 'N/A' ) {

                    value = value * 1 + credits * 1
                    axios.delete(`/api/deleteMelee/${userid}/${uid}/${cid}/${id}?value=${value}`)
                        .then( () => {
                            this.props.importCharacter( cid, this.props.name )
                        } )
                }
            }
        }
    }

    render() {
        const { id, name, alias, bonus, finesse, damage, notes, cost } = this.props.details
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
                        <div className='ei-cost' onClick={() => this.sellEquipment(id, cost)}>{cost} Cr</div>
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

export default connect( mapStateToProps, { updateAlias, importCharacter } )(Melee)