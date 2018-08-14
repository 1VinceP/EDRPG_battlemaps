import React from 'react';
import { connect } from 'react-redux';
import { fireWeapon, reloadWeapon } from '../../redux/characterReducer';

function Ranged({ details, index, weapons, fireWeapon, reloadWeapon }) {
    const { name, bonus, sr, sd, mr, md, lr, ld, damage, current_ammo, ammo, cost, notes, alias } = details

    return (
        <div className='equip-item'>
            <section className='ei-left'>
                <div className='ei-name' onClick={() => fireWeapon(index, weapons)}>
                    { alias && <div style={{fontSize: '8px'}}>{name}</div> }
                    { alias || name }
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
                    <div className='ei-ammo' onClick={() => reloadWeapon(index, weapons, ammo)}>
                        {current_ammo !== null && `${current_ammo} / `}{ammo}
                    </div>
                    <div className='ei-cost'>{cost} Cr</div>
                </div>

                <div className='ei-bottom'>
                    <div className='ei-notes'>Notes: {notes}</div>
                </div>
            </section>
        </div>
    )
}

export default connect( null, { fireWeapon, reloadWeapon } )(Ranged);