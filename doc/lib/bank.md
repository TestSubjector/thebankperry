# Bank

File name: /lib/[bank.js](../lib/bank.js)

## Introduction

This file creates a wrapper for the `accounts` collection in MongoDB, exporting the following necessary functions:

1. `getBalance`
2. `setBalance`
3. `associateAccounts`
4. `linkAccounts`
5. `separateAccounts`

## Requires

1. **[schema](/lib/schema.md)** - self created bot message processor.

## Logic

1. Creates a bank variable that acts as a Class and returns select few public methods.
2. Defines all the functions stated above.
3. Returns the function and exports the Object as a module.

## Usage

Sample code:

```
var bank = require('/path/to/bank.js');
bank.getBalance(telegramid, function (err, balance) {...});
bank.setBalance(telegramid, balance, function (err, success) {...});
bank.associateAccounts(telegramid, accno, function (err, accno) {...});
bank.linkAccounts(telegramid, phonenumber, function (err, accno) {...});
bank.linkAccounts(telegramid, function (err, success) {...});

```

## TODO

1. Implement the `sendMoney` function.
2. Refactor the method names to make more sense.
3. Refactor the callback hell.

## Comments

Known usage: `/lib/listen.js`