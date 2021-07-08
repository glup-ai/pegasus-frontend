/*
Configures an absolutely bare minimum password security
*/
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, keys) => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            if(username === keys.auth.username && password === keys.auth.password) {
                return done(null, {username: keys.auth.username});
            } else {
                return done(null, false);
            }
        }
    ));
    
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });
    
    passport.deserializeUser((username, done) => {
        done(null, {username: username});
    }); 
}
