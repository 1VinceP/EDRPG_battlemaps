const _ = require('lodash');
const chalk = require('chalk');

const errChalk = chalk.red.underline;

module.exports = {

    // save new character to db
    addCharacter: ( req, res ) => {
        const { name, rank, rankPoints, gender, age, height, weight, karma, endurance, backgrounds, karmas, enhancements, personal, vehicle, intelligence, social, espionage, equipment, speed, strong } = req.body.character;
        const { rangedWeapons, meleeWeapons, grenades } =  req.body
        const { uid } = req.params;

        // converting input data into arrays for db
        let backgroundsArr = _.compact( _.values( backgrounds ) );
        let karmasArr = _.values( karmas );
        let enhancementsArr = _.flattenDeep( enhancements );
        let personalArr = capSkills( _.values( personal ) );
        let vehicleArr = capSkills( _.values( vehicle ) );
        let intelligenceArr = capSkills( _.values( intelligence ) );
        let socialArr = capSkills( _.values( social ) );
        let espionageArr = capSkills( _.values( espionage ) );

        console.log( 'hit endpoint' );

        req.app.get('db').character.add_character({ userId: uid, cname: name, crank: rank, rankPoints, gender, age, height, cweight: weight, karma, endurance, backgroundsArr, karmasArr, enhancementsArr, personalArr, vehicleArr, intelligenceArr, socialArr, espionageArr, equipment: [equipment], speed, strong })
            .then( response => {
                let addRanged, addRanged2, addMelee, addGrenade
                let ammo = rangedWeapons === '1' ? 3 : null;
                let alias = meleeWeapons === '5' ? 'Sledgehammer' : null;

                const newCharId = response[0].cid * 1
                addRanged = req.app.get('db').equipment.add_ranged({cid: newCharId, id: rangedWeapons * 1, ammo, alias: '', value: 1000});
                addRanged2 = req.app.get('db').equipment.add_ranged({cid: newCharId, id: rangedWeapons * 1, ammo, alias: '', value: 1000});
                addMelee = meleeWeapons[0] ? req.app.get('db').equipment.add_melee({cid: newCharId, id: meleeWeapons * 1, alias, value: 1000}) : [];
                addGrenade = grenades[0] ? req.app.get('db').equipment.add_grenade({cid: newCharId, id: grenades * 1, value: 1000}) : [];

                Promise.all([ addRanged, addRanged2, addMelee, addGrenade ])
                    .then( () => res.status(200).send( 'New character saved to database') )
                    .catch( err => {
                        console.log( err )
                        res.status(500).send( 'Your character was not saved to the database. Please send the request again' );
                     } );
            } );
    },

    // get all characters for user
    getCharacters: ( req, res ) => {
        const { uid } = req.params;

        req.app.get('db').character.get_characters( uid )
            .then( response => res.status(200).send( response ) );
    },

    // get all data for specific character
    getCharacter: ( req, res ) => {
        const { cid, cname } = req.params;

        let character = req.app.get('db').character.get_character([ cid, cname ]);
        let ranged = req.app.get('db').character.get_ranged( cid );
        let melee = req.app.get('db').character.get_melee( cid );
        let grenade = req.app.get('db').character.get_grenade( cid );

        Promise.all([character, ranged, melee, grenade])
            .then( response => {

                let resChar = { ...response[0] }; // Get character and assign skill values to properties
                for( let key in resChar[0] )
                    { resChar[0][key] = reorganizeSkills( key, resChar[0][key] ) };

                let resRanged = { ...response[1] }; // Assign ranged weapons to character
                for( let key in resRanged)
                    { resChar[0].ranged_weapons.push( resRanged[key] ) };


                let resMelee = { ...response[2] }; // Assign melee weapons to character
                for( let key in resMelee )
                    { resChar[0].melee_weapons.push( resMelee[key] ) };

                let resGrenade = { ...response[3] }; // Assign grenades to character
                for( let key in resGrenade )
                    { resChar[0].grenades.push( resGrenade[key] ) };

                res.status(200).send( resChar[0] );
            } )
            .catch( err => {
                console.log( err )
                res.status(500).send( 'The server failed to fetch your character. Please reload the page to try again' )
            } );
    },

    // save changes to character
    saveCharacter: ( req, res ) => {
        const { name, rank_points, gender, age, height, weight, current_endurance, current_karma, checked, notes, credits, m_cr, units } = req.body;
        const { cid } = req.params;

        console.log( 'Small update to', name );

        let charUpdate = req.app.get('db').character.update_character({ cid, rank_points, gender, age, height, cweight: weight, current_endurance, current_karma, checked, notes, credits, m_cr, units })

        Promise.all([charUpdate])
            .then( () => res.sendStatus(200) )
            .catch( err => console.log( err ) );
    },

    deleteCharacter: ( req, res ) => {
        const { uid, cid } = req.params;

        req.app.get('db').character.delete_character({ uid, cid })
            .then( () => {
                console.log( 'deleted' )
                res.sendStatus(200)
            } )
            .catch( err => {
                console.log( err )
                res.status(500).send( err )
            } );
    }

}

// when new character is created, cap skills at 40
///// NEEDS UPDATE to handle natural genius abilities (possibly just handle this in front end?)
function capSkills( skillsArr ) {
    let newArr = skillsArr.map( skill => {
        if( skill > 40 )
            skill = 40

        return skill;
    } )

    return newArr;
}

// converts numArray on db into keyed object for use on front end
function reorganizeSkills( title, skillsArr ) {
    let obj = {}

    switch( title ) {
        case 'personal':
            obj = {
                dodge: skillsArr[0],
                energyWeapons: skillsArr[1],
                fighting: skillsArr[2],
                grenade: skillsArr[3],
                heavyWeapons: skillsArr[4],
                kineticWeapons: skillsArr[5],
                meleeWeapons: skillsArr[6],
                parry: skillsArr[7]
            }
            return obj;
        case 'vehicle':
            obj = {
                navigation: skillsArr[0],
                repair: skillsArr[1],
                spaceshipPiloting: skillsArr[2],
                spaceshipWeapons: skillsArr[3],
                systems: skillsArr[4],
                vehiclePiloting: skillsArr[5],
                vehicleWeapons: skillsArr[6]
            }
            return obj;
        case 'intelligence':
            obj = {
                computer: skillsArr[0],
                culterAndLaw: skillsArr[1],
                cyber: skillsArr[2],
                medicine: skillsArr[3],
                planetaryKnowledge: skillsArr[4],
                science: skillsArr[5],
                tactics: skillsArr[6],
                trading: skillsArr[7]
            }
            return obj;
        case 'social':
            obj = {
                bargain: skillsArr[0],
                bluff: skillsArr[1],
                charm: skillsArr[2],
                diplomacy: skillsArr[3],
                gambling: skillsArr[4],
                insight: skillsArr[5],
                intimidation: skillsArr[6],
                streetwise: skillsArr[7]
            }
            return obj;
        case 'espionage':
            obj = {
                athletics: skillsArr[0],
                perception: skillsArr[1],
                security: skillsArr[2],
                sleightOfHand: skillsArr[3],
                stealth: skillsArr[4],
                survival: skillsArr[5],
            }
            return obj;

        default:
            return skillsArr;
    }
}