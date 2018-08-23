import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { importCharacter } from '../../redux/characterReducer';

function Armor( props ) {
    const { userid, uid } = props;
    const { id, name, kinetic, energy, melee, fighting, explosive, toxic, hardened, intimidate, athletics, cost, notes, location } = props.details

    function sellEquipment( id, cost ) {
        const { userid, uid, cid, credits, name } = props;

        if( userid === uid * 1 ) {
            let value = prompt('Sell value (standard 70% of purchase cost)', Math.round(cost * .7))

            if( value && credits !== 'N/A' ) {

                value = value * 1 + credits * 1
                axios.delete(`/api/deleteArmor/${userid}/${uid}/${cid}/${id}?value=${value}`)
                    .then( () => {
                        props.importCharacter( cid, name )
                    } )
            }
        }
    }

    return (
        <div className='equip-item'>
            <section className='ei-left'>
                <div className='ei-name'>{name}</div>
            </section>

            <section className='ei-right'>
                <div className='ei-top'>
                    <div>{kinetic}</div>
                    <div>{energy}</div>
                    <div>{melee}</div>
                    <div>{fighting}</div>
                    <div>{explosive}</div>
                    <div>{toxic}</div>
                    <div>{hardened}</div>
                    <div>{intimidate}</div>
                    <div>{athletics}</div>
                    <div className='ei-cost' onClick={() => sellEquipment( id, cost )}>{cost}Cr</div>
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
        uid, cid, credits, name
    };
}

export default connect( mapStateToProps, { importCharacter } )(Armor)