var listen = (function () {
    var status = {
        login: false
    };
    var res;
    var schemas = require("./schema");
    var Users = schemas.users;
    var wit = require("./wit");
    var keys = require("./keys");

    function initResponse(message) {
        res = {
            chat_id: message.chat.id,
        }
    }

    function start(message,callback){
        res.text = "Welcome to The Bank Perry. Use the keyboard to explore and find your way around. NLP is still a work in progress."
        res.reply_markup = keys.getMainKeyboard();
        callback(res);
    }
    
    function login(message, callback) {
        Users.findOne({
            id: message.from.id
        }, function (err, user) {
            if (err) {
                console.log(err);
                return false;
            }
            if (user) {
                console.log('Found:', user);
                Users.update({
                    id: user.id
                }, {
                    $set: {
                        login: true
                    }
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    res.text = "Logged In."
                    callback(res);
                    return true;
                })
            } else {
                res.text = "Please Register yourself before availing our services."
                callback(res);
                return false;
            }
        })
    }

    function logout(message, callback) {
        Users.findOne({
            id: message.from.id
        }, function (err, user) {
            if (err) {
                console.log(err);
                return false;
            }
            if (user) {
                console.log('Found:', user);
                Users.update({
                    id: user.id
                }, {
                    $set: {
                        login: false
                    }
                }, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    res.text = "Logged Out."
                    callback(res);
                    return true;
                })
            } else {
                res.text = "Please Register yourself before availing our services."
                callback(res);
                return false;
            }
        })
    }

    function register(message, callback) {
        Users.findOne({
            id: message.from.id
        }, function (err, user) {
            if (err) {
                console.log(err);
                return false;
            }
            if (user) {
                console.log('FOUND:', user);
                res.text = "Redirecting to /login."
                callback(res);
                login(message, callback);
            } else {
                Users.create({
                    id: message.from.id,
                    login: false,
                    firstname: message.from.first_name,
                    lastname: message.from.last_name,
                    username: message.from.username
                }, function (err, res) {
                    if (err) {
                        console.log(err);
                        return false;
                    }
                    res.text = "Created and logged in.";
                    callback(res);
                    return true;
                })
            }
        })
    }

    function unregister(message, callback) {
        Users.findOne({
            id: message.from.id
        }, function (err, user) {
            if (err) {
                console.log(err);
                return false;
            }
            if (user) {
                console.log('FOUND:', user);
                Users.remove({
                    id: message.from.id
                }, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    res.text = "User removed.";
                    callback(res);
                    return true;
                })
            } else {
                res.text = "User not found.";
                callback(res);
                return true;

            }
        })
    }

    function showBoard(message, callback) {
        res.text = "Have fun with the keyboard."
        
        res.reply_markup = keys.getLocationKeyboard("Send My Location");
//        res.reply_markup = JSON.stringify({
//            keyboard: [['/login', '/logout'], ['Get Status', '/hide']]
//        })
        callback(res);
        return true;
    }

    function hideBoard(message, callback) {
        res.text = "Keyboard Hidden. Type /show to show again."
        res.reply_markup = JSON.stringify({
            hide_keyboard: true
        })
        callback(res);
        return true;
    }

    function defaultReply(message, callback, bot) {
        Users.findOne({
            id: message.from.id
        }, function (err, user) {
            if (err) {
                console.log(err);
                return false;
            }
            if (user) {
                console.log('FOUND:', user);
                if (user.login == 1) {
                    wit.evaluate(message, function (err, data) {
                        if (err) {
                            console.log(err);
                            return false;
                        }
                        console.log("Wit:", data._text);
                        res.text = "Wit: " + JSON.stringify(data);
                        callback(res);
                        return true;
                    }, bot)
                } else {
                    res.text = "You are not logged in. Type /login to login. If you need to register type /register."
                    callback(res);
                    return true;
                }
            } else {
                res.text = "Please Register yourself before availing our services."
                callback(res);
                return false;
            }
        })
    }
    
    return function (message, callback, bot) {
        console.log("MESSAGE: " + message.text);
        initResponse(message);
        if (message.text.split(' ')[0] == "/login") {
            login(message, callback);
        } else if (message.text.split(' ')[0] == "/start") {
            start(message, callback);
        } else if (message.text.split(' ')[0] == "/help") {
            help(message, callback);
        } else if (message.text.split(' ')[0] == "/logout") {
            logout(message, callback);
        } else if (message.text.split(' ')[0] == "/register") {
            register(message, callback);
        } else if (message.text.split(' ')[0] == "/unregister") {
            unregister(message, callback);
        } else if (message.text.split(' ')[0] == "/hide") {
            hideBoard(message, callback);
        } else if (message.text.split(' ')[0] == "/show") {
            showBoard(message, callback);
        } else {
            defaultReply(message, callback, bot);
        }
        return true;
    }
}());
module.exports = listen;
