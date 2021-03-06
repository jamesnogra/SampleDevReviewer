var AuthController = require('./controllers/AuthController');

module.exports = function(app, passport) {

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form
    app.get('/auth/login', AuthController.login);

    // route for showing the profile page
    app.get('/auth/profile', isLoggedIn, function(req, res) {
        //res.send(req.user);
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // route for logging out
    app.get('/auth/logout', function(req, res) {
        req.logout();
        res.redirect('/auth/login');
    });

    // facebook routes
    // twitter routes

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect : '/auth/profile',
        failureRedirect : '/auth/login'
    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/auth/login');
}
