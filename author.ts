let auth = require('basic-auth');

function authenticate(AuthUser, _username, _password, callback) {
	let result = false;
	AuthUser.findOne({username:_username}, function(error, data) {
		if (error) {
			console.log(error);			
			return callback(null, null);		
		} else {			
			if (!data) {
				console.log('User not found');
				return callback(null, null);		
			} else {
				console.log(data.username + ' authenticated successfully');
				return callback(null, _username);
			}
		}
	});
}
module.exports = app => {
    const AuthUser = app.models.authuser;
    app.use(function(request, response, next) {
    const user = auth(request);
    if (user === undefined) {
        response.statusCode = 401;
        response.setHeader('WWW-Authenticate', 'Basic');
        response.end('Unauthorized');
    } else {
		  authenticate(AuthUser, user.name, response, next);
    }
  });
}