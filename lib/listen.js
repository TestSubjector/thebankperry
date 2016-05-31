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
            text: message.text || 'This message doesn\'t contain text :('
        }
        if (message.text == "/login") {
            this.status.login = true;
            res.text = "Login done."
        }
        if (message.text == "/logout") {
            this.status.login = false;
            res.text = "Logout done."
        }
        console.log("STAT: ");
        console.log(false);
        if (!this.status.login) {
            res.text = 'You are not logged in.'
        }
        console.log("RES:");
        console.log(res);
        return res;
    }
}

module.exports = listen;
