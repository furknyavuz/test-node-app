'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the task'
    }
});

module.exports = mongoose.model('Tests', TestSchema);