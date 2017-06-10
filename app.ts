var express = require('express')
  , https = require('https')
  , mongoose = require('mongoose')
  , fs = require('fs')
  , consign = require('consign');

var app = express();

mongoose.connect('mongodb://localhost/contacts');
const mongodb = mongoose.connection;

consign({verbose: false})
  .include('models')
  .then('middlewares.js')
  .then('author.js')
  .then('routes')
  .into(app);

var options = {key  : fs.readFileSync('./contacts.key'),
			   cert : fs.readFileSync('./contacts.cert')};

console.log('Running at port ' + app.get('port'));
https.createServer(options, app).listen(app.get('port'));