const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
};

module.exports.register = async (req, res) => {  // the try catch is ensure the message can flash the error 
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err=>{
            if(err) return next(err);
            req.flash('success', 'welcome to yelp Camp');
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message) //the error itself contains a message 
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login')
};

module.exports.login = (req, res) =>{ // check the credientials from form are accurate
    req.flash('success', 'welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
};

module.exports.logout = (req, res, ) =>{
    req.logout();
    req.flash('success', 'logged you out')
    res.redirect('/campgrounds')
}
