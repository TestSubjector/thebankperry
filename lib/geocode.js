var geocode = (function () {
    var conf = require('../conf');
    var publicConfig = {
        key: conf.mapsToken,
        stagger_time: 1000, // for elevationPath 
        encode_polylines: false,
    };
    var Maps = require("googlemaps");
    var maps = new Maps(publicConfig);

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
    return {getLocation : getLocation}

}());

module.exports = geocode;
