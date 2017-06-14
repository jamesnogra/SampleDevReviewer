var mongoUser = 'sampledevuser';
var mongoUserPassword = '123456p';

module.exports.mongoUser = mongoUser;
module.exports.mongoUserPassword = mongoUserPassword;

module.exports.url = 'mongodb://'+mongoUser+':'+mongoUserPassword+'@ds123312.mlab.com:23312/sampledev';
