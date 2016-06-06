var wit = (function () {
    const Logger = require('node-wit').Logger; //Comment this to disable logging
    const levels = require('node-wit').logLevels; //and this
    const Wit = require('node-wit').Wit;
    const logger = new Logger(levels.DEBUG); //and this
    var extracteddata = null;

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
            },
            // We add our functions here. Whatever functions we defined in wit are handled here
            ['getBankStatement'](sessionId, context, cb) {
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
            }, ['goodbyetheuser'](sessionId, context, cb) {
                //console.log(JSON.stringify(context));
                console.log('handled byes');
                cb(context);
            },
            //This function extracts data. from user messages and sends result of the data through callback
            //Jugaad level over 9000
            merge(sessionId, context, entities, message, cb) {
                var thsh = Object.keys(entities)[0];
                console.log(thsh);
                context[thsh] = Math.random();
                console.log(JSON.stringify(entities));
                cb(context);
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
    const client = new Wit(conf.witToken, actions, logger); //Server Access Token. Since backend Obv :P// Interaction Starts here.
    //No idea if it works :P
    const context = {};
    //Remember this format for JSON. k This is Wit.AI      
    /*                    {
      "msg_id" : "e86468e5-b9e8-4645-95ce-b41a66fda88d",
      "_text" : "hello",
      "entities" : {
        "intent" : [ {
          "confidence" : 0.9753469589149633,
          "value" : "greetings"
        } ]
      }
    }*/
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
        /*        client.converse('test-user-session', message.text, {}, function (err, data) {
                    if (err) {
                        //console.log(err);
                        callback(err);
                    } else {
                        //console.log('Wit:', JSON.stringify(data));
                        callback(err, data);
                    }
                });*/

    }

    return {
        evaluate: evaluate
    };

}());

module.exports = wit;
