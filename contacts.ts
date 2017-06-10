import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as ContactService from './ContactService';

var contactSchema = new mongoose.Schema({
	primarycontactnumber: {type: String, index: {unique: true}},
	firstname: String,
	lastname: String,
	title: String,
	company: String,
	jobtitle: String,	
	othercontactnumbers: [String],
	primaryemailaddress: String,
	emailaddresses: [String],
	groups: [String]
});

var Contact = mongoose.model('Contact', contactSchema);

var john_douglas = new Contact({
	firstname: "John",
	lastname: "Douglas",
	title: "Mr.",
	company: "Dev Inc.",
	jobtitle: "Developer",
	primarycontactnumber: "+359777223345",
	othercontactnumbers: [],
	primaryemailaddress: "john.douglas@xyz.com",
	emailaddresses: ["j.douglas@xyz.com"],
	groups: ["Dev"]
});
//console.log(john_douglas);
console.log('------------');
let data = fs.readFileSync('./data.json', 'utf8');
let contacts = JSON.parse(data).result;
let joe_smith = new Contact(contacts[0]);


var authUserSchema = new mongoose.Schema({	
	username:  {type: String, index: {unique: true}},
	password: String,
	role: String,
});
var Contact = mongoose.model('Contact', contactSchema);
//var AuthUser = mongoose.model('AuthUser', authUserSchema);

/*var yong = new AuthUser({
	username: 'wang',
	password: '1234',
	role: 'admin'
});

mongoose.connect('mongodb://localhost/authuser');
yong.save(error => {
	if (error) console.log('insert user error');
	else {
		yong.save();
		console.log('insert successfully');
	}
})
mongoose.connection.close();	*/

mongoose.connect('mongodb://localhost/contacts');
ContactService.create(Contact, contacts[0], null);


joe_smith.save(function(error) {
	if (error) {
		console.log('Error while saving contact for Mr. Joe Smith');
		console.log(error);
	} 
	else {
		//joe_smith.save();
		console.log('Contact for Mr. Joe Smith has been successfully	stored');
	}
	mongoose.connection.close();	
});