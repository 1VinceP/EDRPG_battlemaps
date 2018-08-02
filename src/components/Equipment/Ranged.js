import React from 'react';

export default function Ranged({ details }) {
    const { name, bonus, SR, SD, MR, MD, LR, LD, damage, currentAmmo, ammo, cost, notes } = details

    return (
        <div className='equip-item'>
            <section className='ei-left'>
                <div className='ei-name'>{name}</div>
            </section>

            <section className='ei-right'>
                <div className='ei-top'>
                    <div className='ei-bonus'>+{bonus}</div>
                    <div className='ei-r-ranges'>
                        <div>{SR}m ({SD})</div>
                        <div>{MR}m ({MD})</div>
                        <div>{LR}m ({LD})</div>
                    </div>
                    <div className='ei-damage'>{damage}</div>
                    <div className='ei-ammo'>{currentAmmo && `${currentAmmo} / `}{ammo}</div>
                    <div className='ei-cost'>{cost} Cr</div>
                </div>

                <div className='ei-bottom'>
                    <div className='ei-notes'>Notes: {notes}</div>
                </div>
            </section>
        </div>
    )
}