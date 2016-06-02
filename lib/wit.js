var wit = (function () {
    const Logger = require('node-wit').Logger; //Comment this to disable logging
    const levels = require('node-wit').logLevels; //and this
    const Wit = require('node-wit').Wit;
    const logger = new Logger(levels.DEBUG); //and this
    const actions = {
        say(sessionId, context, message, cb) {
                console.log(message);
                cb();
            },
            merge(sessionId, context, entities, message, cb) {
                cb(context);
            },
            error(sessionId, context, err) {
                console.log(err.message);
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
    function evaluate(message, callback) {
        
        
        const session = 'my-user-session-42';
const context0 = {};
client.runActions(session, message.text, context0, (e, context1) => {
  if (e) {
    console.log('Oops! Got an error: ' + e);
                      callback(e);
  }
  console.log('The session state is now: ' + JSON.stringify(context1));
        callback(e,JSON.stringify(context1));
        
        
        
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
