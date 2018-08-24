module.exports = {

    getKarma: ( req, res ) => {

        req.app.get('db').data.get_karma()
            .then( response => res.status(200).send( response ) )
            .catch( err => console.log( err ) );
    },

    getEnhance: ( req, res ) => {

        req.app.get('db').data.get_enhance()
            .then( response => res.status(200).send( response ) )
            .catch( err => console.log( err ) );
    }

}