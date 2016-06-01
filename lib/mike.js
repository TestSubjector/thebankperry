var mike = (function () {
    var express = require('express');
    var app = express();

    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    return app;
}());
module.exports = mike;
