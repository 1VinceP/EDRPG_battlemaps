import React from 'react';

export default function Melee({ details }) {
    const { name, alias, bonus, finesse, damage, notes, cost } = details

    return (
        <div className='equip-item' >
            <section className='ei-left'>
                <div className='ei-name'>
                    { alias && <div style={{fontSize: '8px'}}>{name}</div> }
                    { alias || name }</div>
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
                </div>
            </section>

        </div>
    )
}