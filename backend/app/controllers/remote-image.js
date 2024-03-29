var config = require('../config');
var https = require("https");
var querystring = require('querystring');

// retreive the JSON when communicate with remote API (NASA)
function getJSON(res, options) {
    const reqApi = https.request(options, (resApi) => {
        let rawData = '';
        resApi.on('data', (chunk) => {
            rawData += chunk;
        });
        resApi.on('end', () => {
            const parsedData = JSON.parse(rawData);
            res.json(parsedData);
        });
    });
    reqApi.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });
    reqApi.end();
}

// Get the remote images from the DB
module.exports.getImages = function (req, res) {
    var q = req.query.q;
    if (!q)
        q = "*";
    const options = {
        hostname: config.images.host,
        path: config.images.path.search + "?" + querystring.stringify(
            {
                "q": q,
                "media_type": "image"
            }),
        method: 'GET'
    };
    getJSON(res, options);
};

// Get a specific image from the API using an ID
module.exports.getImage = function (req, res) {
    const options = {
        hostname: config.images.host,
        path: config.images.path.search + "?" + querystring.stringify(
            {
                "nasa_id": req.params.id,
                "media_type": "image"
            }),
        method: 'GET'
    };
    getJSON(res, options);
};

// Get a remote collection from the API
module.exports.getCollection = function (req, res) {
    const options = {
        hostname: config.images.host,
        path: config.images.path.asset + "/" + querystring.stringify(req.params.id),
        method: 'GET'
    };
    getJSON(res, options);
};

