// routes.js

// BASE SETUP
// =============================================================================

// use a configuration file
var config = require('../config');

// call the packages we need
var express = require('express'); // call express
var app = express(); // define the app
var bodyParser = require('body-parser');
var path = require("path"); // Provide utilities for working with file and directory paths
var morgan = require('morgan');
var jwt = require('express-jwt');

// Set the MongoDb Database connection
var mongoose = require('mongoose');
mongoose.connect(config.db.uri);

// Import model
var User = require('../models/user');
var Collection = require('../models/collection');
var Image = require('../models/image');

// Import controllers
var ctrlUser = require('../controllers/user');
var ctrlImage = require('../controllers/image');
var ctrlCollection = require('../controllers/collection');

// Setup express jwt with the secret
var auth = jwt({
    secret: config.jwt.secret,
    userProperty: 'payload' // redefine the request property to avoid confusion with model user
});

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Setup passport to adapt the mechanism to our model
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (username, password, done) {
        var query = {};
        if (username.indexOf('@') === -1)
            query = { 'username': username };
        else
            query = { 'email': username };
        User.findOne(query, function (err, user) {
            if (err) {
                return done(err);
            }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));

// Configure application
app.set('json escape', 'true');
app.set('title', 'Message Board');
//app.use(express.static(path.join(__dirname,'static'))); // allow direct access to this folder

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup Morgan logger library
app.use(morgan('common'));

// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get instance of Router

// on routes that end in /images
// ----------------------------------------------------
router.route('/images')
    // get all the images from API
    .get(function (req, res) {
        ctrlImage.getImages(req, res);
    });

router.route('/images/:id')
    // get one image from the api
    .get(function (req, res) {
        ctrlImage.getImage(req, res);
    });

router.route('/collections')
    .get(function(req,res){
        ctrlCollection.getPublicCollections(req,res);
    })

    .post(function(req,res){
        ctrlCollection.saveCollection(req,res);
    });

router.route('/collections/:collection_id')
    .get(function (req, res) {
        ctrlCollection.getCollection(req, res);
    })

    .put(function (req,res){
        ctrlCollection.updateCollection(req,res);
    });

router.route('/collections/:collection_id/images')
    .get(function(req,res){
        ctrlCollection.getImages(req,res);
    });

router.route('/register')
    // Register a new user in the db
    .post(function (req, res) {
        ctrlUser.register(req, res);
    });

router.route('/login')
    // Verify credentials for a user
    .post(function (req, res) {
        ctrlUser.login(req, res);
    });

router.route('/users')
    // Get all users
    .get(function (req, res) {
        User.find()
            .exec(function (err, users) {
                if (err)
                    res.send(err);
                res.json(users);
            });
    });

router.get('/profile', auth, ctrlUser.profileRead);

app.use(passport.initialize());
app.use(config.app.restApiRoute, router);

// START THE SERVER
// =============================================================================
var port = config.app.port; // set our port
app.listen(port);
console.log('Server listening on port ' + port);
