var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    id: String,
    login: Boolean,
    firstname: String,
    lastname: String,
    username: String,
    state: Object
});

var schema2 = new mongoose.Schema({
    telegramid: String,
    customerid: String,
    email: String,
    customername: String,
    customerlocation: String
});
var mymodule ={}; 
mymodule.users = mongoose.model('users', schema);
mymodule.customers = mongoose.model('customers', schema2);
module.exports = mymodule;