var conf = require("./conf");
conf.updates = {
    enabled: true,
	get_interval: 1000
};
var Telegram = require('telegram-bot-api');
var bot = new Telegram(conf);
console.log("Bot started.");
bot.on('message', function (message) {
	var chat_id = message.chat.id;

	// It'd be good to check received message type here
	// And react accordingly
	// We consider that only text messages can be received here

	bot.sendMessage({
		chat_id: message.chat.id,
		text: message.text || 'This message doesn\'t contain text :('
	})
	.then(function(message)
	{
		console.log(message);
	})
	.catch(function(err)
	{
		console.log(err);
	});
});