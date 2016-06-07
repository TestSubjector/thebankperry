var geocode = (function () {
    var conf = require('../conf');
    var publicConfig = {
        key: conf.mapsToken,
        stagger_time: 1000, // for elevationPath 
        encode_polylines: false,
    };
    var Maps = require("googlemaps");
    var maps = new Maps(publicConfig);
    var schemas = require("./schema");
    var Atms = schemas.atms;
    var getLocation = function (location, callback) {
        var geocodeParams = {
            "address": location,
            "language": "en"
        };
        maps.geocode(geocodeParams, function (err, result) {
            if (err) {
                callback(err);
            } else {
                if (result.results[0].geometry.location) {
                    callback(err, result.results[0].geometry.location);
                } else {
                    callback({
                        message: "Location Not Found."
                    })
                }
            }
        });
    }

    var getDistance = function (latlng1, latlng2, callback) {
        var distance = maps.geometry.spherical.computeDistanceBetween(new maps.LatLng(latlng1.latitude, latling1.longitude), new maps.LatLng(latlng2.latitude, latling2.longitude), function (err, distance) { // in metres
            if (err) {
                callback(err);
            } else {
                callback(err, distance);
            }
        });
    }
    var getATMLocation = function (location, callback) {
        Atms.findOne({
            name: "ATM " + location
        }, function (err, atm) {
            if (err) {
                console.log("ATM:", err);
                callback(err);
            } else if (atm) {
                callback(err, Json.stringify(atm))
            } else {
                callback({
                    message: "ATM not found"
                })
            }
        });
    }

    return {
        getLocation: getLocation,
        getDistance: getDistance,
        getATMLocation: getATMLocation
    }

}());

module.exports = geocode;
