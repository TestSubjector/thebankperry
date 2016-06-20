var keys = (function () {
  function getLocationKeyboard(buttontext) {
    var locationbutton = {
      text: buttontext,
      request_location: true
    };
    var reply_markup = JSON.stringify({
      keyboard: [
        [locationbutton],
        ['Hello']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    });
    return reply_markup;
  }

  function getContactKeyboard(buttontext) {
    var contactbutton = {
      text: buttontext,
      request_contact: true
    };
    var reply_markup = JSON.stringify({
      keyboard: [
        [contactbutton],
        ['Cancel']
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    });
    return reply_markup;
  }

  function getMainKeyboard() {
    var reply_markup = JSON.stringify({
      keyboard: [
        ["/register", "/login", "/logout"],
        ["Get Balance"],
        ["Find ATM"]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    });
    return reply_markup;
  }

  function hideKeyboard() {
    var reply_markup = JSON.stringify({
      keyboard: [
        ["/register", "/login", "/logout"],
        ["Get Balance"],
        ["Find ATM"]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    });
    return reply_markup;
  }

  return {
    getLocationKeyboard: getLocationKeyboard,
    getContactKeyboard: getContactKeyboard,
    getMainKeyboard: getMainKeyboard,
    hideKeyboard: hideKeyboard
  };
}());

module.exports = keys;
