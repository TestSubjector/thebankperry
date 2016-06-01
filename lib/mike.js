var mike = (function () {
    var express = require('express');
    var app = express();
    var cors = require('cors')
    var bot = null;
    var Users = require("./schema");
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var app = express();
    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());

    var setbot = function (telebot) {
        bot = telebot;
    }
    app.get('/', function (req, res) {
        res.send("Post a POST request to this url with a body like: message=I am a message.")
    });
    
    app.post('/mike', function (req, res) {
        //console.log(req.body);
        var counter = 0;
        var msg = {
            text: req.body.message || "default"
        };
        
        console.log("BROADCAST:", msg.text);
        Users.find({}, function (err, users) {
            if (err) {
                console.log(err);
                return false;
            }
            users.forEach(function (user) {
                var mymsg = msg;
                console.log("Mike: Broadcast sent to", user.id);
                mymsg.chat_id = user.id;
                bot.sendMessage(mymsg).catch(function (err) {
                    console.log(err);
                })
                
            })
        })
        res.send("All fine, guys!");
    });

    return {
        webServer: app,
        setBroadcastBot: setbot
    };
}());

module.exports = mike;
