import React from 'react';
import _ from 'lodash';
import rangedData from '../../data/ranged_weapons.json';
import meleeData from '../../data/melee_weapons.json';
import './equipment.css';

export default function Equipment({ ownedData, bonuses, type }) {
    const { energyWeapons, kineticWeapons, meleeWeapons, fighting, grenade } = bonuses
    let data

    if( type === 'ranged' || type === 'grenades' ) data = rangedData;
    else if( type === 'melee' ) data = meleeData;
    // else if( type === 'grenade' ) data = grenadeData;
    // else if( type === 'equipment' ) data = equipmentData;

    function normalizeString(str) {
        return _.camelCase(str).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    }

    let mappedData = []
    if( ownedData[0] ) {
        mappedData = ownedData.map( (item, i) => {
            let details;
            let newItem = item;

            if( item === 'sledgehammer' ) newItem = 'axe/hammer';

            for( let key in data ) {
                if( _.camelCase(key) === _.camelCase(newItem) ) {
                    details = data[key];
                    details.name = normalizeString(item);
                    details.bonus = details.type === 'kinetic'
                                    ? Math.floor(kineticWeapons / 10)
                                        : details.type === 'energy'
                                        ? Math.floor(energyWeapons / 10)
                                            : details.type === 'melee'
                                            ? Math.floor(meleeWeapons / 10)
                                                :details.type === 'fighting'
                                                ? Math.floor(fighting / 10)
                                                    : details.type === 'grenade'
                                                    ? Math.floor(grenade / 10)
                                                        : null
                };
            };

            if( type === 'ranged' && details ) {
                return (
                    <div key={i} className='equip-item ei-ranged'>
                        <div className='ei-r-name'>{details.name}</div>
                        <div>+{details.bonus}</div>
                        <div className='ei-r-ranges'>
                            <div>{details.SR}m ({details.SD})</div>
                            <div>{details.MR}m ({details.MD})</div>
                            <div>{details.LR}m ({details.LD})</div>
                        </div>
                        <div>{details.damage}</div>
                        <div>{details.ammo}</div>
                        <div>{details.cost} Cr</div>
                        <div className='ei-r-notes'>Notes: {details.notes}</div>
                    </div>
                )
            }
            else if( type === 'grenades' && details ) {
                return (
                    <div key={i}>
                        <div>{details.name}</div>
                        <div>{details.damage}</div>
                    </div>
                )
            }
            else if( type === 'melee' && details ) {
                return (
                    <div key={i} className='equip-item ei-melee' >
                        <div>{details.name}</div>
                        <div>+{details.bonus}</div>
                        <div>{details.finesse}</div>
                        <div>{details.damage}</div>
                        <div>{details.notes}</div>
                        <div>{details.cost} Cr</div>
                    </div>
                )
            }

        } )
    }

    return (
        <div className='equip-main'>
            <div className='equip-head'>
                <div className='equip-head-name'>{normalizeString(type)}</div>
                <div className='equip-head-tri' />
            </div>
            <div className='equip-data'>
                {mappedData}
            </div>
        </div>
    )
}