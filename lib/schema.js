var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: String,
    login: Boolean,
    firstname: String,
    lastname: String,
    username: String
});
 
module.exports = mongoose.model('users', schema);
