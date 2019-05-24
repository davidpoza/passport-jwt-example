'use strict'

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var UserSchema = Schema({
    username: {type: String, required: true},
    first_name: String,
    last_name: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    login_count: Number
});

module.exports = mongoose.model('User', UserSchema, "users");