import React from 'react';
import _ from 'lodash';

import Ranged from './Ranged';
import Melee from './Melee';
import Grenade from './Grenade';
import { normalizeString } from '../../utils/helperMethods';
import './equipment.css';

export default function Equipment({ ownedData, bonuses, type }) {
    const { energyWeapons, kineticWeapons, heavyWeapons, meleeWeapons, fighting, grenade } = bonuses
    let mappedData = []

    mappedData = ownedData.map( (item, i) => {
        let details = { ...item };

        // Set bonuses based on character stats and weapon bonuses
        if( details.type ) {
            details.bonus = details.type === 'Kinetic' ? Math.floor((kineticWeapons + details.kinetic) / 10)
                        : details.type === 'Energy' ? Math.floor((energyWeapons + details.energy) / 10)
                        : details.type.match(/Heavy/) ? Math.floor((heavyWeapons + details.heavy) / 10)
                        : details.type === 'Melee' ? Math.floor(meleeWeapons / 10)
                        : details.type === 'Fighting' ? Math.floor(fighting / 10)
                        : details.type === 'Grenade' && Math.floor(grenade / 10)
        }

        // Styling for these components found in ./equipment.css
        if( type === 'ranged' && details )
            return <Ranged key={i} details={details} index={i} weapons={ownedData} />

        else if( type === 'melee' && details )
            return <Melee details={details} key={i} weapons={ownedData} />

        else if( type === 'grenades' && details )
            return <Grenade details={details} key={i} />
    } )

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