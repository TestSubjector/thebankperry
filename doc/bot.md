# Bot

File name: [bot.js](../bot.js)

## Introduction

This file is the entry point of the project, and does four main tasks:

1. Start the Express Server for feature [mike](/lib/mike.md)
2. Connect to MongoDB.
3. Connect to Telegram Bot API
4. Pass on all messages received to module [listen](/lib/listen.md)

## Requires

1. **[conf](/conf.md)** - self created *untracked* configuration module.
2. **[listen](/lib/listen.md)** - self created bot message processor.
3. **[mike](/lib/mike.md)** - self created bot message broadcaster.
4. **telegram-bot-api**
5. **mongoose**

## Logic

1. Loads project configuration as `conf`.
2. Specifies telegram-bot-api specific configuration, taking API key from `conf`.
3. Loads message processor as `botMessageProcessor`.
4. Creates a Telegram Bot object as `bot`.
5. Loads and starts the Express Server as `mike`.
6. Loads and connects to MongoDB using parameters in `conf`.
7. Adds 'message' event listener on `bot` to pass messages to `botMessageProcessor`.
8. Processes callback from `botMessageProcessor` and sends reply to user.

## Comments

Insert random comments in this part.