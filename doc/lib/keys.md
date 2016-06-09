# Keys

File name: /lib/[keys.js](../lib/keys.js)

## Introduction

This file provides different keyboard layouts to send as reply_markup to the telegram-bot. The following functions are provided.

1. `getLocationKeyboard(buttontext)`
2. `getContactKeyboard(buttontext)`
3. `getMainKeyboard()`
4. `hideKeyboard()`

## Requires

Nothing. Is a standalone module.

## Logic

1. Defines and returns reply_markup objects.
2. Read Telegram Bot API to explain resize_keyboard,one_time_keyboard, etc.
3. Returns these functions as a module.

## Usage

Sample code:

```
var keys = require('/path/to/keys.js');
res.reply_markup = keys.getContactKeyboard("Send My Phone Number");
res.reply_markup = keys.getLocationKeyboard("Send My Location");
res.reply_markup = keys.getMainKeyboard();
res.reply_markup = keys.hideKeyboard();

```

## TODO

1. Find a way to make resize_keyboard,one_time_keyboard, etc. parameters modifiable.
2. Experiment with and add inline keyboards where required.

## Comments

Thing works good. Can be ignored for long.