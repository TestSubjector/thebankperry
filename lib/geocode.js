var geocode = (function () {
    var conf = require('../conf');
    var publicConfig = {
        key: conf.mapsToken,
        stagger_time: 1000, // for elevationPath 
        encode_polylines: false,
    };
    var maps = require("googlemaps");
    var gmAPI = new maps(publicConfig);

    var getLocation = function(location,callback) {
        var geocodeParams = {
            "address": location,
            "language": "en"
        };
        gmAPI.geocode(geocodeParams, function (err, result) {
            if(err){
                callback(err);
            }
            else{
                if(result.results[0].geometry.location){
                    callback(err,result.results[0].geometry.location);
                }
                else{
                    callback({message: "Location Not Found."})
                }
                //loc.results[0].geometry.location
                
            }
        });
    }
    return {getLocation : getLocation}

}());

module.exports = geocode;
