'use strict'

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var UserSchema = Schema({
    username: String,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    login_count: Number
});

module.exports = mongoose.model('User', ItemSchema, "users");