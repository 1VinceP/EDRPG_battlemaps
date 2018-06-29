const _ = require('lodash');
const chalk = require('chalk');

module.exports = {

    addCharacter: ( req, res ) => {
        const { name, rank, rankPoints, gender, age, height, weight, karma, endurance, backgrounds, karmas, enhancements, personal, vehicle, intelligence, social, espionage } = req.body
        const { uid } = req.params

        let backgroundsArr = _.compact( _.values( backgrounds ) )
        let karmasArr = _.values( karmas )
        let enhancementsArr = _.flattenDeep( enhancements )
        let personalArr = capSkills( _.values( personal ) )
        let vehicleArr = capSkills( _.values( vehicle ) )
        let intelligenceArr = capSkills( _.values( intelligence ) )
        let socialArr = capSkills( _.values( social ) )
        let espionageArr = capSkills( _.values( espionage ) )

        console.log( 'hit endpoint' )

        req.app.get('db').character.add_character({ userId: uid, cname: name, crank: rank, rankPoints, gender, age, height, cweight: weight, karma, endurance, backgroundsArr, karmasArr, enhancementsArr, personalArr, vehicleArr, intelligenceArr, socialArr, espionageArr })
            .then( () => res.sendStatus(200) )
            .catch( err => console.log( err ) )
    },

    getCharacters: ( req, res ) => {
        const { uid } = req.params

        req.app.get('db').character.get_characters( uid )
            .then( response => res.status(200).send( response ) )
    },

    getCharacter: ( req, res ) => {
        const { cid, cname } = req.params

        req.app.get('db').character.get_character([ cid, cname ])
            .then( response => {
                for( let key in response[0] ) {
                    response[0][key] = reorganizeSkills( key, response[0][key] )
                }

                res.status(200).send( response )
            } )
            .catch( err => console.log( err ) )
    },

    smallUpdateCharacter: ( req, res ) => {
        const { rank_points, gender, age, height, weight, current_endurance, current_karma, checked } = req.body
        const { cid } = req.params

        console.log( 'Small Update to', cid )

        req.app.get('db').character.small_update_character({ cid, rank_points, gender, age, height, cweight: weight, current_endurance, current_karma, checked })
            .then( () => res.sendStatus(200) )
            .catch( err => console.log( err ) )
    }

}

function capSkills( skillsArr ) {
    let newArr = skillsArr.map( skill => {
        if( skill > 40 )
            skill = 40

        return skill;
    } )

    return newArr;
}

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
                meleeWeapons: skillsArr[5],
                parry: skillsArr[6]
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
                slightOfHand: skillsArr[3],
                stealth: skillsArr[4],
                survival: skillsArr[5],
            }
            return obj;

        default:
            return skillsArr;
    }
}