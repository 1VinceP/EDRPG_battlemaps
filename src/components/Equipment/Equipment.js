import React from 'react';
import _ from 'lodash';
import rangedData from '../../data/ranged_weapons.json';
import meleeData from '../../data/melee_weapons.json';

import Ranged from './Ranged';
import Grenade from './Grenade';
import Melee from './Melee';
import './equipment.css';

export default function Equipment({ ownedData, bonuses, type }) {
    const { energyWeapons, kineticWeapons, heavyWeapons, meleeWeapons, fighting, grenade } = bonuses
    let data

    if( type === 'ranged' || type === 'grenades' ) data = rangedData;
    else if( type === 'melee' ) data = meleeData;
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

            let comp = typeof item === 'string' ? item : item[0]
            let newComp = typeof newItem === 'string' ? newItem : newItem[0]
            for( let key in data ) {
                if( _.camelCase(key) === _.camelCase(newComp) ) {
                    // bonuses on keys "kinetic", "energy", "heavy"
                    details = data[key];
                    details.name = normalizeString(comp);
                    details.bonus = details.type === 'kinetic' ? Math.floor((kineticWeapons + details.kinetic) / 10)
                                    : details.type === 'energy' ? Math.floor((energyWeapons + details.energy) / 10)
                                    : details.type.match(/heavy/) ? Math.floor((heavyWeapons + details.heavy) / 10)
                                    : details.type === 'melee' ? Math.floor(meleeWeapons / 10)
                                    : details.type === 'fighting' ? Math.floor(fighting / 10)
                                    : details.type === 'grenade' && Math.floor(grenade / 10)
                    details.currentAmmo = details.ammo && item[1]
                };
            };

            // Styling for these components found in ./equipment.css
            if( type === 'ranged' && details )
                return <Ranged details={details} key={i} />

            else if( type === 'grenades' && details )
                return <Grenade details={details} key={i} />

            else if( type === 'melee' && details )
                return <Melee details={details} key={i} />

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