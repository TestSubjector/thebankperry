'use strict'
var conf = require("./conf");
var botlogic = require("./lib/listen");

conf.updates = {
    enabled: true,
    get_interval: 1000
};

var mike = require("./lib/mike");
mike.listen(3000, function () {
    console.log('Express: Mike listening on port 3000.');
});

var Telegram = require('telegram-bot-api');
var bot = new Telegram(conf);
console.log("Telegram: Bot started.");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/thebankperry', function (err) {
    if (err) {
        console.log('MongoDB: Connection Error.', err);
    } else {
        console.log('MongoDB: Connection Successful.');
    }
});
bot.on('message', function (message) {
    botlogic(message, function sendMessage(msg) {
        console.log("REPLY: ", msg.text);
        bot.sendMessage(msg).catch(function (err) {
            console.log(err);
        })
    })
});
