var mongoose = require('mongoose');

var userschema = new mongoose.Schema({
    id: String,
    login: Boolean,
    firstname: String,
    lastname: String,
    username: String,
    state: Object
});

var accountschema = new mongoose.Schema({
    telegramid: String,
    accno: String,
    email: String,
    customername: String,
    balance: Number,
    phone: String,
    transactions: Object
});
var mymodule ={}; 
mymodule.users = mongoose.model('users', userschema);
mymodule.customers = mongoose.model('accounts', accountschema);
module.exports = mymodule;