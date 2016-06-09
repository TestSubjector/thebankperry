# Geocode

File name: /lib/[geocode.js](../lib/geocode.js)

## Introduction

This file provides the following location services for the bot:

1. Reverse Geocoding.
2. Distance Between Two Coordinates.

## Requires

1. **[schema](/doc/lib/schema.md)** - self created mongodb schema module.
2. **[conf](/doc/conf.md)** - self created *untracked* configuration module.
3. **googlemaps**

## Logic

1. Loads and creates Google Maps Object as `map` using API key from `conf`.
2. Loads `schema` to get `atms` MongoDB Model Object.
3. Defines `getLocation` function for reverse geocoding using location name as String.
    * Async call to `maps.geocode`, with a callback.
    * Callback function callbacks the response callback with the location as JSON object.
4. Defines `getDistance` function to calculate distance between two points on Earth.
5. Defines `getATMLocation` function to do a very bad job of finding ATM.
6. Returns the above three functions as a module.

## Usage

Sample code:

```
var geocode = require('/path/to/geocode.js');
geocode.getLocation(address, function (err, latlng) {...});
geocode.getDistance(latlng1, latlng2, function (err, distance) {...});
geocode.getATMLocation(address, function (err, atmAsJSONString) {...})
```

## TODO

1. Change the piece of shit that `getATMLocation` is.
2. Remove `schema` as a dependency of this module.
3. Refactor method names and respective parts of the rest of the code.

## Comments

getATMLocation urgently needs to be rewritten. From scratch. Or I'll scratch my eyes off.