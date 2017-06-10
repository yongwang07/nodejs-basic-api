import * as _v2 from '../ContactService';
var Grid = require('gridfs-stream')
   , url = require('url')
  , CacheControl = require("express-cache-control");

var cache = new CacheControl().middleware;

module.exports = app => {
    let Contact = app.models.contacts;
    app.get('/contacts/:primarycontactnumber', function(request, response) {
	    console.log(request.url + ' : querying for ' + request.params.primarycontactnumber);
	    _v2.findByNumber(Contact, request.params.primarycontactnumber, response);	
    });

    app.delete('/contacts/:primarycontactnumber', function(request, response) {
        _v2.remove(Contact, request.params.primarycontactnumber, response);
    });

    app.get('/contacts/:primarycontactnumber/image', function(request, response){
	    var gfs = Grid(mongodb.db, mongoose.mongo);
	    _v2.getImage(gfs, request.params.primarycontactnumber, response);
    })

    app.post('/contacts/:primarycontactnumber/image', function(request, response){
	    var gfs = Grid(mongodb.db, mongoose.mongo);
	    _v2.updateImage(gfs, request, response);
    })

    app.delete('/contacts/:primarycontactnumber/image', function(request, response){
		var gfs = Grid(mongodb.db, mongoose.mongo);
		_v2.deleteImage(gfs, mongodb.db, request.params.primarycontactnumber, response);
    });

    app.get('/contacts', cache('minutes',1), function(request, response) {
	    console.log('redirecting to /v2/contacts');
        let get_params = url.parse(request.url, true).query;	
        if (Object.keys(get_params).length == 0) {
            _v2.paginate(Contact, request, response);
	    } else {
            if (get_params['limit'] != null || get_params['page'] !=null) {
                _v2.paginate(Contact, request, response);
            } else {
                var key = Object.keys(get_params)[0];
                var value = get_params[key];
			    _v2.query_by_arg(Contact, key, value, response);
            }
        }        
    });
    app.get('/contacts/:primarycontactnumber',  function(request, response) {
	    console.log(request.url + ' : querying for ' + request.params.primarycontactnumber);
	    _v2.findByNumber(Contact, request.params.primarycontactnumber, response);	
    });
}