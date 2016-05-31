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
        status.login = true;
        res.text = "Login done."
        callback(res);
        return true;
    }

    function logout(message, callback) {
        status.login = false;
        res.text = "Logout done."
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
            res.text = 'You are not logged in. Type /login to login.'
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
        }
        else if (message.text == "/logout") {
            logout(message, callback);
        }
        else if (message.text == "/hide") {
            hideBoard(message, callback);
        }
        else if (message.text == "/show") {
            showBoard(message, callback);
        }
        else{
            defaultReply(message,callback);
        }
        return true;
    }
}());
module.exports = listen;
