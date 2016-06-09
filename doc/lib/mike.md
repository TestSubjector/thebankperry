# Mike

File name: /lib/[mike.js](../lib/mike.js)

## Introduction

This file provides the broadcast feature for the bot - an API endpoint that can be used to send a message to all users of the bot. Send POST request to /mike/:message to send a broadcast

## Requires

1. **[schema](/doc/lib/schema.md)** - self created mongodb schema module.
2. **express**
3. **cors**
4. **cookie-parser**
5. **body-parser**

## Logic

1. Loads `express` and dependencies, creates an `express` instance as `var app = express();`.
2. Defines function `setBot` to have an own instance of Telegram Bot for sending message.
3. Adds `app.post('/mike/:message')` route which:
    * Finds all bot users from `users` collection in mongo.
    * Sends broadcast message using a for loop to all users.
4. Returns the functions `setBroadcastBot` and `webServer` as a module.

## Usage
Exact code used in [bot.js](../bot.md)

```
var mike = require("./lib/mike");
mike.setBroadcastBot(bot);
mike.webServer.listen(3000, function () {
    console.log('Express: Mike listening on port 3000.');
});
```

## TODO

1. Urgent: Look for pagination limitations in mongo at step `#Logic:3.1`
2. Urgent: Add authentication before sending broadcast.

## Comments

Needs immediate attention.