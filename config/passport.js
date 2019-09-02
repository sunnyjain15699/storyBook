const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport');
const keys = require('./keys');
const mongoose = require('mongoose');


const passAuthentication =(passport)=>{
    passport.use(new GoogleStrategy({
        clientID: keys.client_id,
        clientSecret: keys.client_secret,
        callbackURL: "/auth/google/callback" || 'https://hidden-brushlands-71654.herokuapp.com/auth/google/callback' ,
        proxy: true
      },
    (accessToken, refreshToken, profile, cb) =>{
        console.log(accessToken);
        console.log(profile);
      }
    ));
}

module.exports = passAuthentication