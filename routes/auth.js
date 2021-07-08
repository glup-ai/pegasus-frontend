var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/')
    }
    res.render('login', {message:req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
    failureFlash: 'Error' 
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

module.exports = router;