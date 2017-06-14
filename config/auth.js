// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '455953028255-jdak1mon6s22lu7rruu0bam1rcp28jb8.apps.googleusercontent.com',
        'clientSecret'  : 'kCTVOwqDKxErhJ0_McgqwsNP',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
