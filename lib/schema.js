var mongoose = require('mongoose');

var userschema = new mongoose.Schema({
    id: String,
    login: Boolean,
    accno: String,
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

var atmschema = new mongoose.Schema({
    name: String,
    latitude: String,
    longitude: String,
    status: String
});
var mymodule = {};
mymodule.users = mongoose.model('users', userschema);
mymodule.accounts = mongoose.model('accounts', accountschema);
mymodule.atms = mongoose.model('atms', atmschema);
module.exports = mymodule;

