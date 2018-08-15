const chalk = require('chalk');

module.exports = function( req, res, next ) {
    const { userid } = req.params;
    const { userid: uid } = req.body;

    if( userid == uid )
        next();
    else {
        console.log( chalk.red( 'UNAUTHORIZED SAVE ATTEMPTED' ) )
        res.status(403).send( 'You are not authorized to save changes to this character' );
    }
};