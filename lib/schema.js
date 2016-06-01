var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: String,
    login: Boolean,
    firstname: String,
    lastname: String,
    username: String
});

var schema2 = new mongoose.Schema({
    telegramid: String,
    customerid: String,
    email: String,
    customername: String,
    customerlocation: String
});
 
module.exports = mongoose.model('users', schema);
module.exports = mongoose.model('customers', schema2);
