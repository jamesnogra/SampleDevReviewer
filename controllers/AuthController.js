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


module.exports.login = function(req, res) {
    res.render('../views/login');
};
