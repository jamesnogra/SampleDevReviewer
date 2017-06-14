const MongoClient = require('mongodb').MongoClient;
var mongoconfig = require('../config/database');
var Review = require('../models/Review');
var db;

//connect to db
MongoClient.connect(mongoconfig.url, (err, database) => {
    if (err) { return console.log(err); }
    db = database;
    //Review = db.collection('reviews');
});


module.exports.addReview = function(req, res) {
    if (req.isAuthenticated()) {
        res.render('../views/add_review', {user:req.user});
    } else {
        res.render('not_authorized');
    }
};

module.exports.postAddReview = function(req, res) {
    var review = req.body;
    review.date = Date.now();
	review.user = req.user.google.name;
    var newReview = Review(review);
    newReview.save(function(error) {
        if (error) throw error;
        res.redirect('/all-reviews');
    });
};

module.exports.allReviews = function(req, res) {
    Review.find().sort({'date':-1}).find(function(err, results) {
        res.render('all_reviews', {results:results, user:req.user});
    });
};

module.exports.editReview = function(req, res) {
    var reviewId = req.params._id;
    Review.findOne({'_id':reviewId}, function(err, result) {
        if (err) throw err;
        res.render('../views/edit_review', {result:result, user:req.user});
    });
};

module.exports.postEditReview = function(req, res) {
    var reviewId = req.params._id;
    var updatedReview = req.body;
    Review.findByIdAndUpdate(reviewId, updatedReview, function(err, review) {
        if (err) throw err;
        res.redirect('/all-reviews');
    })
};

module.exports.deleteReview = function(req, res) {
    var reviewId = req.params._id;
    Review.findOneAndRemove({'_id':reviewId}, function(err, result) {
        if (err) throw err;
        res.redirect('/all-reviews');
    });
};
