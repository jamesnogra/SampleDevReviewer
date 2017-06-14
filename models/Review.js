var mongoconfig = require('../config/database');

// grab the things we need
var mongoose = require('mongoose');
mongoose.connect(mongoconfig.url);
var Schema = mongoose.Schema;

// create a schema
var reviewSchema = new Schema({
    rating: Number,
    review: String,
	user: String,
    date: Date
});

// the schema is useless so far
// we need to create a model using it
var Review = mongoose.model('Review', reviewSchema);

// make this available to our users in our Node applications
module.exports = Review;
