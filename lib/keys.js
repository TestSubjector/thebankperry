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

    return {
        getLocationKeyboard: getLocationKeyboard
    }
}());

module.exports = keys;
