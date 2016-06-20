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
          });
        }
      }
    });
  };

  var getDistance = function (latlng1, latlng2, callback) {
    var distance = function (lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    };
    console.log("Function Call:", latlng1.lat, latlng1.lng, latlng2, 'K');
    //"latitude":"18.59","longitude":"72.50"
    callback(false, distance(latlng1.lat, latlng1.lng, latlng2.latitude, latlng2.longitude, 'K'));
  };
  var getATMLocation = function (location, callback) {
    Atms.findOne({
      name: "ATM " + location
    }, function (err, atm) {
      if (err) {
        console.log("ATM:", err);
        callback(err);
      } else if (atm) {
        callback(err, JSON.stringify(atm));
      } else {
        callback({
          message: "ATM not found"
        });
      }
    });
  };

  return {
    getLocation: getLocation,
    getDistance: getDistance,
    getATMLocation: getATMLocation
  };

}());

module.exports = geocode;
