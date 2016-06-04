var bank = (function () {
    var schemas = require("./schema");
    var Accounts = schemas.accounts;

    function getBalance(telegramid, callback) {
        Accounts.findOne({
            telegramid: telegramid
        }, function (err, acc) {
            if (err) {
                console.log("Bank:", err);
                callback(err);
            } else if (acc) {
                callback(err, acc.balance)
            } else {
                callback({
                    message: "account not found"
                })
            }
        })
    }

    function setBalance(telegramid, balance, callback) {
        Accounts.findOne({
            telegramid: telegramid
        }, function (err, acc) {
            if (err) {
                console.log("Bank:", err);
                callback(err);
            } else if (acc) {
                Accounts.update({
                    telegramid: telegramid
                }, {
                    $set: {
                        balance: balance
                    }
                }, function (err, result) {
                    if (err) {
                        console.log("Bank:", err);
                        callback(err);
                    } else {
                        callback(err, {
                            message: "success"
                        })
                    }

                })
            } else {
                callback({
                    message: "account not found"
                })
            }
        })
    }

    function sendMoney(telegramid, accno, amount, callback) {
        //TODO Create sendMoney function.
    }

    function associateAccounts(telegramid, accno, callback) {
        Accounts.findOne({
            accno: accno
        }, function (err, acc) {
            if (err) {
                console.log("Bank:", err);
                callback(err);
            } else if (acc) {
                Accounts.update({
                    accno: accno
                }, {
                    $set: {
                        telegramid: telegramid
                    }
                }, function (err, result) {
                    if (err) {
                        console.log("Bank:", err);
                        callback(err);
                    } else {
                        callback(err, {
                            message: "success"
                        })
                    }

                })
            } else {
                callback({
                    message: "account not found"
                })
            }
        })
    }

    function seperateAccounts(telegramid, callback) {
        Accounts.findOne({
            telegramid: telegramid
        }, function (err, acc) {
            if (err) {
                console.log("Bank:", err);
                callback(err);
            } else if (acc) {
                Accounts.update({
                    telegramid: telegramid
                }, {
                    $set: {
                        telegramid: null
                    }
                }, function (err, result) {
                    if (err) {
                        console.log("Bank:", err);
                        callback(err);
                    } else {
                        callback(err, {
                            message: "success"
                        })
                    }

                })
            } else {
                callback({
                    message: "account not found"
                })
            }
        })
    }
    return {
        getBalance: getBalance,
        setBalance: setBalance,
        associateAccounts: associateAccounts,
        seperateAccounts: seperateAccounts
    }
}());

module.exports = bank;
