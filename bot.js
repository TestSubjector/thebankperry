'use strict'
var conf = require("./conf");
var botlogic = require("./lib/listen");
conf.updates = {
    enabled: true,
    get_interval: 1000
};
var Telegram = require('telegram-bot-api');
var bot = new Telegram(conf);
console.log("Bot started.");

bot.on('message', function (message) {
    botlogic(message, function sendMessage(msg) {
        bot.sendMessage(msg).catch(function (err) {
            console.log(err);
        })
    })
});