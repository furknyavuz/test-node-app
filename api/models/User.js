'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({github: {}});
module.exports = mongoose.model('User', UserSchema);