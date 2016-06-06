var wit = (function () {
    const Logger = require('node-wit').Logger; //Comment this to disable logging
    const levels = require('node-wit').logLevels; //and this
    const Wit = require('node-wit').Wit;
    const logger = new Logger(levels.DEBUG); //and this
    var extracteddata = null;
    var geocode = require('./geocode');

    function getchatid(chatidbro) {
        var res = chatidbro.split("-")
        return res[0];
    }
    const actions = {
        say(sessionId, context, message, cb) {
                console.log("Wit Says : " + message);

                var msg = {
                    chat_id: getchatid(sessionId),
                    text: message
                };
                sendMessage(msg);
                cb();
            }, ['getBankStatement'](sessionId, context, cb) {
                var msg = {
                    chat_id: getchatid(sessionId),
                    text: "Getting you your Bank Statements."
                };
                sendMessage(msg);
                context = {
                    "amount_c": "500"
                }
                console.log('handled statements');
                cb(context);
            }, ['greettheuser'](sessionId, context, cb) {
                //console.log(JSON.stringify(context));
                console.log('handled hi\'s');
                cb(context);
            }, ['getNewPolicy'](sessionId, context, cb) {
                var msg = {
                    chat_id: getchatid(sessionId),
                    text: "Getting you the new policy."
                };
                sendMessage(msg);
                cb(context);
            }, ['getNewPolicy2'](sessionId, context, cb) {
                var msg = {
                    chat_id: getchatid(sessionId),
                    text: "Getting you the new policy."
                };
                sendMessage(msg);
                cb(context);
            }, ['getATM'](sessionId, context, cb) {
                //console.log(JSON.stringify(context));
                geocode.getLocation(context['location'], function (err, data) {
                    if (!err) {
                        context['atmloc'] = data;
                        var msg = {
                            chat_id: getchatid(sessionId),
                            text: "Your nearest ATM is situtated in Lat : " + data.lat + ' Long : ' + data.lng
                        };
                        sendMessage(msg);
                    }
                });
                cb(context);
            },
            merge(sessionId, context, entities, message, cb) {
                var thsh = Object.keys(entities)[0];
                if (thsh == "atm_e") {
                    if (entities.location) {
                        context = {
                            "location": entities.location[0].value,
                            "atm_e": "ATM"
                        }
                    }
                    cb(context);
                } else if (thsh == "location") {
                    context = {
                        "location": entities.location[0].value,
                        "atm_e": "ATM"
                    }
                    cb(context);
                } else {
                    console.log(thsh);
                    context[thsh] = Math.random();
                    console.log(JSON.stringify(entities));
                    cb(context);
                }
            },
            error(sessionId, context, err) {
                console.log(err.message);
                var msg = {
                    chat_id: getchatid(sessionId),
                    text: "I'm sorry. I could not understand."
                };
                sendMessage(msg);
            },


    };
    var conf = require("../conf");
    const client = new Wit(conf.witToken, actions, logger);
    const context = {};

    function sendMessage(message) {
        var botconf = {
            'token': conf.telegramToken,
            'updates': {
                enabled: true,
                get_interval: 1000
            }
        }
        var Telegram = require('telegram-bot-api');
        var bot = new Telegram(botconf);
        console.log("Reply From Wit:", message.text);
        bot.sendMessage(message).catch(function (err) {
            console.log(err);
        })
    }
    var curuser = null;

    function evaluate(message, callback) {

        var d = new Date();
        const session = message.chat.id + '-' + d.getTime();
        const context0 = {};
        curuser = message.chat.id;
        client.runActions(session, message.text, context0, (e, returnedContext) => {
            if (e) {
                console.log('Oops! Got an error: ' + e);
                //callback(e);
            }
            console.log('The session state is now: ' + JSON.stringify(returnedContext));
            //callback(e, "");
        });
    }

    return {
        evaluate: evaluate
    };

}());

module.exports = wit;
