const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GroupSchema = new Schema({
	name: {type: String, requiered: true, max:128}, 
	password: {type: String, required: true, max:64},
	masterPassword: {type: String, required: false, max:64},
	description: {type: String, required: true, max:256}
});

// Export the model
module.exports = mongoose.model('Group', GroupSchema);