/*
 * Model for activities.
 *
 */

// Dependencies.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Activity Schema
let ActivitySchema = new Schema({
    name: {type: String, required: true, max: 128},
    description: {type: String, required: true, max:512},
    date: {type: Date, required: true},
    priority: {type: Number, required: true, max:4}, // Mas bajo mas importante.
    group: {type: String, required: true, max:128}
});

// Export the model
module.exports = mongoose.model('Activity', ActivitySchema);