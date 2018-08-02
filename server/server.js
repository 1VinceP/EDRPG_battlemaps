require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , chalk = require('chalk');

const authController = require('./controllers/auth_controller');
const charController = require('./controllers/character_controller');

let app = express();

app.use( bodyParser.json() );
app.use( session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}) );
app.use( passport.initialize() );
app.use( passport.session() );

////////// Authentication set up with Auth0
passport.use( new Auth0Strategy({
    domain: process.env.domain,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: 'openid email profile'
},
    function( accessToken, refreshToken, extraParams, profile, done ) {
        const db = app.get('db')

        db.auth.find_user( profile.id )
            .then( user => {
                if( user[0] )
                    return done( null, user )
                else {
                    db.auth.create_user([profile.displayName, profile.emails[0].value, profile.id])
                        .then( user => done( null, user ) )
                }
            })
    }
) )

////////// Connecting to Database
massive( process.env.DATABASE_URI ).then( db => {
    console.log( chalk.magenta('Connected to Database') );
    app.set( 'db', db );
    // app.get('db').init.seed()
    //     .then( res => console.log( res ) )
    //     .catch( err => console.log( err ) )
    listener(); // listening inside of massive to prevent attempted DB calls before successful connection
} );

////////// Authentication action
passport.serializeUser( ( user, done ) => {
    done( null, user )
} );
passport.deserializeUser( ( obj, done ) => {
    done( null, obj[0] )
} );

// AUTH ENDPOINTS
app.get( '/auth', passport.authenticate( 'auth0' ) );
app.get( '/auth/callback', passport.authenticate( 'auth0', {
    successReturnToOrRedirect: process.env.SUCCESS,
    failureRedirect: process.env.FAILURE,
    failureFlash: true
} ) );
app.get( '/auth/me', authController.login );
app.get( '/auth/logout', authController.logout );


// CHARACTER ENDPOINTS
app.post( '/api/addCharacter/:uid', charController.addCharacter )
app.get( '/api/userCharacters/:uid', charController.getCharacters )
app.get( '/api/character/:cid/:cname', charController.getCharacter )
app.put( '/api/smallUpdateCharacter/:cid', charController.smallUpdateCharacter )
app.put( '/api/smallNotesUpdate/:cid', charController.smallNotesUpdate )


// creating function at end of file for readability
function listener() {
    let port = process.env.NODE_PORT || 7707;
    const portChalk = chalk.cyan.underline;
    app.listen( port, () => {
        console.log( portChalk(`listening on port ${port}`) )
    });
}
