var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PostSchema = new Schema({
	'User' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'Date' : Date,
	'Content' : String,
	'Attachments' : Array
});

module.exports = mongoose.model('Post', PostSchema);
