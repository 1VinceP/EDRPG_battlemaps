import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { importCharacter } from '../../redux/characterReducer';

function Grenade( props ) {
    const { userid, uid } = props;
    const {id, name, damage, cost, notes, bonus, location } = props.details

    function sellEquipment( id, cost, thrown ) {
        const { userid, uid, cid, credits } = props;
        let value = credits * 1;

        if( thrown )
            value = credits * 1
        else if( !thrown && userid == uid ) {
            value = prompt('Sell value (standard 70% of purchase cost)', Math.round(cost * .7)) * 1
            if( value )
                value += credits * 1
            else if( !value )
                return;
        }

        if( userid == uid && value !== null ) { // Check if user is logged in and owns the character

            axios.delete( `/api/deleteGrenade/${userid}/${uid}/${cid}/${id}?value=${value}` )
                .then( () => {
                    props.importCharacter( cid, props.name )
                } )
        }
    }

    return (
        <div className='equip-item'>
            <section className='ei-left'>
                <div className='ei-name' onClick={() => sellEquipment(id, cost, true)}>{name}</div>
            </section>

            <section className='ei-right'>
                <div className='ei-top'>
                    <div className='ei-bonus'>+{bonus}</div>
                    <div className='ei-g-damage'>{damage}</div>
                    <div className='ei-cost' onClick={() => sellEquipment(id, cost, false)}>{cost} Cr</div>
                </div>

                <div className='ei-bottom'>
                    <div className='ei-notes'>Notes: {notes}</div>
                </div>

                { userid === uid * 1
                    ? <div className='ei-bottom ei-base'>
                        <div></div>
                        <div>
                            Location: <select>
                                <option>Self (equipped)</option>
                                <option>Self (holstered)</option>
                                <option>Bag</option>
                                <option>Ship</option>
                            </select>
                        </div>
                    </div>
                    : <div className='ei-bottom ei-base'><div />Location: {location}</div>
                }
            </section>
        </div>
    )
}

function mapStateToProps( state ) {
    const { userid } = state.auth.user;
    const { userid: uid, cid, credits, name } = state.character.character;

    return {
        userid,
        uid,
        cid,
        credits,
        name
    };
}

export default connect( mapStateToProps, { importCharacter } )(Grenade);