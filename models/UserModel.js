var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'FirstName' : String,
	'LastName' : String,
	'EmailAddress' : String,
	'Password' : String,
	'Locations' : Array
});

module.exports = mongoose.model('User', UserSchema);
