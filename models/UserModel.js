var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'FirstName' : String,
	'LastName' : String,
	'EmailAddress' : String,
	'Password' : String,
	'Locations' : [{
		'Date': Date,
		'Latitude': Number,
		'Longitude': Number
	}],
	'PersonRequests': [{
		'Date': Date,
		'From': {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		'To': {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	}],
	'Notifications': [{
		'Date': Date,
		'Type': String,
		'RelatedUser': {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	}],
	'People': [{
		'Date': Date,
		'User': {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	}]
});

module.exports = mongoose.model('User', UserSchema);
