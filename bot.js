var conf = require("./conf");
var listen = require("./lib/listen");
conf.updates = {
    enabled: true,
    get_interval: 1000
};
var Telegram = require('telegram-bot-api');
var bot = new Telegram(conf);
console.log("Bot started.");

bot.on('message', function (message) {
    var chat_id = message.chat.id;
    //console.log(message);
    // It'd be good to check received message type here
    // And react accordingly
    // We consider that only text messages can be received here

    bot.sendMessage(listen.process(message)).catch(function (err) {
        console.log(err);
    });
});
