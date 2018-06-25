const _ = require('lodash');

module.exports = {

    addCharacter: ( req, res, next ) => {
        const { name, rank, rankPoints, gender, age, height, weight, karma, endurance, backgrounds, karmas, enhancements, personal, vehicle, intelligence, social, espionage } = req.body
        const userId = 1

        let backgroundsArr = _.compact( _.values( backgrounds ) )
        let karmasArr = _.values( karmas )
        let enhancementsArr = _.flattenDeep( enhancements )
        let personalArr = capSkills( _.values( personal ) )
        let vehicleArr = capSkills( _.values( vehicle ) )
        let intelligenceArr = capSkills( _.values( intelligence ) )
        let socialArr = capSkills( _.values( social ) )
        let espionageArr = capSkills( _.values( espionage ) )

        console.log( 'hit endpoint' )

        // req.app.get('db').character.add_character([ userId, name, rank, rankPoints, gender, age, height, weight, karma, endurance, backgroundsArr, karmasArr, enhancementsArr, personalArr, vehicleArr, intelligenceArr, socialArr, espionageArr ])
        //     .then( () => res.sendStatus(200) )
        //     .catch( err => console.log( err ) )
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