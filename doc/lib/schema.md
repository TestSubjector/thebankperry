# Schema

File name: /lib/[schema.js](../lib/schema.js)

## Introduction

This file defines the schema of the following 3 collections in MongoDB:

1. Collection of telegram users: `users`
2. Collection of bank accounts: `accounts`
3. Collection of ATMs and locations: `atms`

## Requires

1. **mongoose**

## Logic

1. Defines schemas as JSON objects.
2. Creates MongoDB models out of the schema objects.
3. Exports the 3 MongoDB models as a module.

## Usage

Sample code:

```
var schema = require('/path/to/schema.js');
schema.users;
schema.accounts;
schema.atms;
```

## Comments

The code is obvious. Wrote the documentation for practice.