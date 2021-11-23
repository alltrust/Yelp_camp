const express = require('express');
const router = express.Router();
const passport = require('passport')
const catchAsync = require('../utilities/catchAsync')
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);
//the passport authenticate is using the passport for a middleware...the parameters used are a part of its docs. 

router.get('/logout', users.logout);

module.exports = router;