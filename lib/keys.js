var keys = (function () {
    function getLocationKeyboard(buttontext) {
        var locationbutton = {
            text: buttontext,
            request_location: true
        };
        var reply_markup = JSON.stringify({
            keyboard: [[locationbutton], ['Hello']],
            resize_keyboard: true,
            one_time_keyboard: true
        })
        return reply_markup;
    }
    function getMainKeyboard() {
        var reply_markup = JSON.stringify({
            keyboard: [["/register","/login","/logout"],["/help","/balance","/transactions"]],
            resize_keyboard: true,
            one_time_keyboard: true
        })
        //var keyboard = [["1","2","3"],["1","2","3"],["1","2","3"],["Backscpace","0","Calculate"]]
        //reply_markup.keyboard = keyboard;
        return reply_markup;
    }

    return {
        getLocationKeyboard: getLocationKeyboard,
        getMainKeyboard: getMainKeyboard
    }
}());

module.exports = keys;
