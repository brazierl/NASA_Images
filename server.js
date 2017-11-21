// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define the app
var bodyParser = require('body-parser');
var path = require("path"); // Provide utilities for working with file and directory paths
var http = require("https");
var querystring = require('querystring');
var url = require('url');

// Configure application
app.set('json escape', 'true');
app.set('title', 'Message Board');
//app.use(express.static(path.join(__dirname,'static'))); // allow direct access to this folder

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// Set the MongoDb Database connection
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:27017/bears');

// Define model
//var Image = require('./app/models/image');
//var Collection = require('./app/models/collection');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get instance of Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('(' + new Date().toLocaleString() + ') Remote user (' + (req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress) + ') requesting \'' + req.method + ": " + req.originalUrl + '\'.');
    next(); // make sure we go to the next routes and don't stop here
});

const nasaApiUrl = "images-api.nasa.gov";
const searchPath = "/search";
const collectionPath = "/asset";
const nasaApiPort = 80;

// on routes that end in /images
// ----------------------------------------------------
router.route('/images')

    // get all the images from API
    .get(function (req, res) {
        const options = {
            hostname: nasaApiUrl,
            path: searchPath + "?" + querystring.stringify(
                { 
                    "q": "*",
                    "media_type": "image" 
                }),
            method: 'GET'
        };
        
        const reqApi = http.request(options, (resApi) => {
            // resApi.setEncoding('utf8');
            let rawData = '';
            resApi.on('data', (chunk) => {
                rawData+=chunk;
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

    });

app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port ' + port);
