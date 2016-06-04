var keys = (function () {
    var getLocationKeyboard(buttontext) {
        var locationbutton = {
            text: buttontext,
            request_contact: true
        };
        var reply_markup = JSON.stringify({
            keyboard: [[locationbutton]],
            resize_keyboard: true,
            one_time_keyboard: true
        })
        return reply_markup;
    }
    
    return {
        getLocationKeyboard: getLocationKeyboard
    }
}());

module.exports = keys;
