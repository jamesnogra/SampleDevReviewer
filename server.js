const express = require('express');
const bodyParser= require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var ejsLayouts = require("express-ejs-layouts");
const app = express();

//call the controllers
var ReviewController = require(__dirname+'/controllers/ReviewController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(__dirname + '/public'));
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.set("views","./views");

require('./config/passport')(passport); // pass passport for configuration

// required for passport
app.use(session({ secret: '123456abcdefgQLPe' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//load the google auth routes
require('./authentication_routes')(app, passport);

app.listen(3000, () => {
  console.log('listening on 3000')
});

//for reviews
app.get('/', function(req, res) {
    res.redirect('/all-reviews');
});
app.get('/add-review', checkIfLoggedIn, ReviewController.addReview);
app.post('/add-review', ReviewController.postAddReview);
app.get('/all-reviews', ReviewController.allReviews);
app.get('/edit-review/:_id', checkIfLoggedIn, ReviewController.editReview);
app.post('/edit-review/:_id', ReviewController.postEditReview);
app.get('/delete-review/:_id', checkIfLoggedIn, ReviewController.deleteReview);


// route middleware to make sure a user is logged in
function checkIfLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.render('not_authorized');
}
