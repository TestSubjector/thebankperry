var listen = (function () {
  var status = {
    login: false
  };
  var res;
  var schemas = require("./schema");
  var Users = schemas.users;
  var Accounts = schemas.accounts;
  var Bank = require("./bank");
  var wit = require("./wit");
  var keys = require("./keys");

  function initResponse(message) {
    res = {
      chat_id: message.chat.id,
    };
  }

  function start(message, callback) {
    res.text = "Welcome to The Bank Perry. Use the keyboard to explore and find your way around. NLP is still a work in progress.";
    res.reply_markup = keys.getMainKeyboard();
    callback(res);
  }

  function getState(message) {
    Users.findOne({
      id: message.from.id
    }, function (err, user) {
      if (err) {
        console.log(err);
        return false;
      }
      if (user) {
        return user.state;
      } else {
        return {
          conversing: false
        };
      }
    });
  }

  function sessionrouter(message, callback) {
    //TODO: Code to call session functions with necessary state value.
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
          res.text = "Logged In.";
          callback(res);
          return true;
        });
      } else {
        res.text = "Please Register yourself before availing our services.";
        callback(res);
        return false;
      }
    });
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
          res.text = "Logged Out.";
          callback(res);
          return true;
        });
      } else {
        res.text = "Please Register yourself before availing our services.";
        callback(res);
        return false;
      }
    });
  }

  function register(message, callback) {
    res = {
      chat_id: message.chat.id,
    };
    Users.findOne({
      id: message.from.id
    }, function (err, user) {
      if (err) {
        console.log(err);
        return false;
      }
      if (user) {
        console.log('FOUND:', user);
        if (user.accno !== null) {
          res.text = "You are already registered.";
          callback(res);
        } else {
          res.reply_markup = keys.getContactKeyboard("Send My Phone Number");
          res.text = "Please share your phone number with us.";
          callback(res);
        }
      } else {
        Users.create({
          id: message.from.id,
          login: false,
          firstname: message.from.first_name,
          lastname: message.from.last_name,
          username: message.from.username,
          state: {
            conversing: true
          },
          accno: null
        }, function (err) {
          if (err) {
            console.log(err);
            return false;
          }
          res.reply_markup = keys.getContactKeyboard("Send My Phone Number");
          res.text = "Please share your phone number with us.";
          callback(res);
          return true;
        });
      }
    });

  }

  function linkaccounts(message, callback) {
    Users.findOne({
      id: message.from.id
    }, function (err, user) {
      if (err) {
        console.log(err);
        return false;
      }
      if (user) {
        console.log('FOUND:', user);
        if (user.accno !== null) {
          res.text = "You are already registered.";
          callback(res);
        } else {
          Bank.linkAccounts(message.from.id, message.contact.phone_number, function (err, reply) {
            if (err) {
              console.log(err);

            }
            console.log(reply);
            if (reply) {
              console.log('FOUND:', reply);
              Users.update({
                id: user.id
              }, {
                $set: {
                  accno: reply
                }
              }, function (err, result) {
                if (err) {
                  console.log(err);
                }
                res.text = "Congratulations. Your bank account have been linked to your telegram account.";
                res.reply_markup = keys.getMainKeyboard();
                callback(res);
                return true;
              });

            } else {
              res.text = "We're sorry. We couldn't find an account with that phone number.";
              res.reply_markup = keys.getMainKeyboard();
              callback(res);
              return true;
            }
          });
        }
      } else {
        res.text = "Were you trying to register? Type /register.";
        res.reply_markup = keys.getMainKeyboard();
        callback(res);
        return true;

      }
    });
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
        }, function (err) {
          if (err) {
            console.log(err);
          }
          res.text = "User removed.";
          callback(res);
          return true;
        });
      } else {
        res.text = "User not found.";
        callback(res);
        return true;

      }
    });
  }

  function showBoard(message, callback) {
    res.text = "Have fun with the keyboard.";

    res.reply_markup = keys.getLocationKeyboard("Send My Location");
    //        res.reply_markup = JSON.stringify({
    //            keyboard: [['/login', '/logout'], ['Get Status', '/hide']]
    //        })
    callback(res);
    return true;
  }

  function hideBoard(message, callback) {
    res.text = "Keyboard Hidden. Type /show to show again.";
    res.reply_markup = JSON.stringify({
      hide_keyboard: true
    });
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
            return true;
          }, bot);
        } else {
          res.text = "You are not logged in. Type /login to login. If you need to register type /register.";
          callback(res);
          return true;
        }
      } else {
        res.text = "Please Register yourself before availing our services.";
        callback(res);
        return false;
      }
    });
  }

  return function (message, callback, bot) {
    console.log("MESSAGE: " + message.text);
    console.log(message);
    initResponse(message);
    //if(getState(message).conversing){
    if (false) {
      sessionrouter(message, callback, getState(message));
    } else if (message.contact) {
      linkaccounts(message, callback);
    } else if (message.text.split(' ')[0] == "/login") {
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
  };
}());
module.exports = listen;
