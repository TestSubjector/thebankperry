var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tpbbase');
var User = mongoose.model('User', {
    id: String,
    login: Number,
    firstname: String,
    lastname: String,
    username: String
});

//Basic Testing
var listen = function () {
        var listen = (function () {
            var status = {
                login: false
            };
            var res;

            function initResponse(message) {
                res = {
                    chat_id: message.chat.id,
                }
            }

            function login(message, callback) {
                User.findOne({
                    name: message.user.id
                }, function (err, userObj) {
                    if (err) {
                        console.log(err);
                    } else if (userObj) {
                        console.log('Found:', userObj);
                        userObj.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                userObj.login = 1;
                                console.log('Logged In', userObj);
                                res.text = "Please Register yourself before availing our services."
                                callback(res);
                                return true;
                            }
                        });
                    }
                } else {
                    console.log('User not found!');
                    res.text = "Please Register yourself before availing our services."
                    callback(res);
                    return false;
                })
            }

            function logout(message, callback) {
                User.findOne({
                    name: message.user.id
                }, function (err, userObj) {
                    if (err) {
                        console.log(err);
                    } else if (userObj) {
                        console.log('Found:', userObj);
                        userObj.save(function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                userObj.login = 0;
                                console.log('Logged Out', userObj);
                            }
                        });
                    }
                } else {
                    console.log('User not found!');
                    res.text = "Please Register yourself before availing our services."
                    callback(res);
                    return false;
                })
            }
            function register(message, callback) {
                var usernew = new User({id: message.user.id, login: 0, firstname: message.user.first_name, lastname:  message.user.last_name,username: message.user.username}); //Need to add a error checking here
                res.text = "Thank you for signing up. You have been successfully registered."
                callback(res);
                return true;
            }

            function showBoard(message, callback) {
                res.text = "Have fun with the keyboard."
                res.reply_markup = JSON.stringify({
                    keyboard: [['/login', '/logout'], ['Get Status', '/hide']]
                })
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

            function defaultReply(message, callback) {
                if (!status.login) {
                    res.text = 'You are not logged in. Type /login to login. If you need to register type /register.'
                    callback(res);
                    return true;
                } else {
                    res.text = "Need Help? Type /help."
                    callback(res);
                    return true;
                }
            }
            return function (message, callback) {
                console.log("MESSAGE: " + message.text);
                initResponse(message);
                if (message.text == "/login") {
                    login(message, callback);
                } else if (message.text == "/logout") {
                    logout(message, callback);
                } else if (message.text == "/register") {
                    register(message, callback);
                } else if (message.text == "/hide") {
                    hideBoard(message, callback);
                } else if (message.text == "/show") {
                    showBoard(message, callback);
                } else {
                    defaultReply(message, callback);
                }
                return true;
            }
        }());
        module.exports = listen;
