# The Bank Perry

## Introduction

A Telegram Bot to demonstrate the feasibility of using a bot to provide banking services using Natural Language Processing. It is a very basic example that supports features like:

1. Find nearest ATM using reverse geocoding.
2. Get account statement.
3. Send Money to another account.
4. Ability to send emergency broadcasts/policy change reminders to all bot users.

## Deployment

Deployment will be lengthy and not much worth it because you'd need to have API keys for 3 different services. If you know the developers, contact for the configuration file.

Following are deployment instructions for Ubuntu/Debian-based-linux-distros:

```
sudo apt install nodejs
git clone https://github.com/TestSubjector/thebankperry.git
cd thebankperry
sudo npm install
cp /path/to/config/file/we/sent/you.js conf.js
npm start
```
If all went file, you'd be able to successfully run the code and test it out.

## Contribute

You'd first need to browse the source code documentation and the actual files. We've created an entry point for your ease. The code execution starts from /bot.js, so you start reading about it from [here](/doc/bot.md). Contact us for any queries. Thanks and best of luck.

## To Do
- [ ] Document listen.js and wit.js
- [X] Implement Wit-AI
- [X] Registration and Login System
- [X] Fixing Package Issues
- [X] Keeping Git Clean (Hopefully :P)