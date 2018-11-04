'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Int32 = require('mongoose-int32');

const UserSchema = new Schema({github: {}, github_token: {}, github_id: Int32});
module.exports = mongoose.model('User', UserSchema);