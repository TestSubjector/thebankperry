var listen = {
    status: {
        login: false
    },
    process: function (message, status) {
        this.status = status || this.status;
        console.log("GOT MESSAGE");
        console.log(message);
        var res = {
            chat_id: message.chat.id,
            text: message.text || 'This message doesn\'t contain text :(',
            reply_markup: JSON.stringify({keyboard: [['/login','/logout'],['Get Status','Help']]})
        }
        if (message.text == "/login") {
            this.status.login = true;
            res.text = "Login done."
            return res;
        }
        if (message.text == "/logout") {
            this.status.login = false;
            res.text = "Logout done."
            return res;
        }
        console.log("STAT:");
        console.log(false);
        if (!this.status.login) {
            res.text = 'You are not logged in.'
            return res;
        }
        console.log("RES:");
        console.log(res);
        return res;
    }
}

module.exports = listen;
