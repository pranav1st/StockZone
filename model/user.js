const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email_id: {type: String, required: true, unique: true},
    passwd: {type: String, required: true}},
    {collection: 'users'});

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model;