const chalk = require('chalk');

module.exports = {

    addRanged: ( req, res ) => {
        const { cid } = req.params;
        const { id, alias, value, ammo } = req.body;

        req.app.get('db').equipment.add_ranged({ cid, id, alias, ammo, value })
            .then( () => {
                res.sendStatus(200);
            } )
            .catch( err => console.log( err ) );
    },

    saveRanged: ( req, res ) => {
        const { id, current_ammo, alias, location } = req.body.weapon;

        req.app.get('db').equipment.update_ranged({ id, current_ammo, alias, location })
            .then( () => {
                console.log( chalk.blue('ranged update!') );
                res.sendStatus(200);
            } )
            .catch( err => console.log( err ) );
    },

    deleteRanged: ( req, res ) => {
        const { id, cid } = req.params;
        const { value } = req.query;

        req.app.get('db').equipment.delete_ranged({ id, cid, value })
            .then( response => {
                console.log( 'SUCCESS!!' );
                res.sendStatus(200);
            } )
            .catch( err => console.log( err ) );
    },

    addMelee: ( req, res ) => {
        const { cid } = req.params;
        const { id, alias, value } = req.body;

        req.app.get('db').equipment.add_melee({ cid, id, alias, value })
            .then( () => {
                res.sendStatus(200);
            } )
    },

    saveMelee: ( req, res ) => {
        const { id, alias, location } = req.body.weapon;

        req.app.get('db').equipment.update_melee({ id, alias, location })
            .then( () => {
                console.log( chalk.blue('melee update!') );
                res.sendStatus(200);
            } )
            .catch( err => console.log( err ) );
    },

    deleteMelee: ( req, res ) => {
        const { id, cid } = req.params;
        const { value } = req.query;

        req.app.get('db').equipment.delete_melee({ id, cid, value })
            .then( () => {
                console.log( 'SUCCESS!' );
                res.sendStatus(200);
            } )
            .catch( err => console.log( err ) )
    },

    addGrenade: ( req, res ) => {
        const { cid } = req.params;
        const { id, value } = req.body;

        req.app.get('db').equipment.add_grenade({ id, cid, value })
            .then( () => res.sendStatus(200) )
            .catch( err => console.log( err ) );
    },

    deleteGrenade: ( req, res ) => {
        const { id, cid } = req.params;
        const { value } = req.query;

        req.app.get('db').equipment.delete_grenade({ id, cid, value })
            .then( () => {
                console.log( 'Grenade Delete' );
                res.sendStatus(200);
            } )
            .catch( err => console.log( err ) );
    },

    addArmor: ( req, res ) => {
        const { cid } = req.params;
        const { id, value } = req.body;

        req.app.get('db').equipment.add_armor({ id, cid, value })
            .then( () => res.sendStatus(200) )
            .catch( err => console.log( err ) );
    },

    deleteArmor: ( req, res ) => {
        const { id, cid } = req.params;
        const { value } = req.query;

        req.app.get('db').equipment.delete_armor({ id, cid, value })
            .then( () => res.sendStatus(200) )
            .catch( err => console.log( err ) );
    }

}