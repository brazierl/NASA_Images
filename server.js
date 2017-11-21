// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define the app
var bodyParser = require('body-parser');
var path = require("path"); // Provide utilities for working with file and directory paths

// Configure application
app.set('json escape','true');
app.set('title', 'Message Board');
//app.use(express.static(path.join(__dirname,'static'))); // allow direct access to this folder

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// Set the MongoDb Database connection
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bears');

// Define model
//var Image = require('./app/models/image');
//var Collection = require('./app/models/collection');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get instance of Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('('+new Date().toLocaleString()+') Remote user ('+(req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress)+') requesting \''+req.method+": "+req.originalUrl+'\'.');
    next(); // make sure we go to the next routes and don't stop here
});







// on routes that end in /messages
// ----------------------------------------------------
router.route('/images')

    // create a message (./api/messages)
    .post(function(req, res) {
        // var image = new Image();      // create a new instance of the Image model
        // message.course = req.body.course;  // set the message's course
        // message.body = req.body.body;  // set the message's body
        // message.date = new Date();  // set the message's course
        // console.log(req);
        ////save the bear and check for errors
        // message.save(function(err) {
            // if (err)
                // res.send(err);

            // res.json({ message: 'Message created!' });
        // });

    })
    
    // get all the messages
    .get(function(req, res) {
        // Message.find()
        // .sort({ date : -1 })
        // .limit(20)
        // .exec(function(err, messages) {
            // if (err)
                // res.send(err);

            // res.json(messages);
        // });
    });

router.route('/images/:id')

	// get the image with this id
	.get(function(res,res){
		
	});
    
// on routes that end in /messages/:course_id
// ----------------------------------------------------
router.route('/collection/:id')

    // get the message with that course ID
    .get(function(req, res) {
        // Message
        // .find({'course': req.params.course})
        // .sort({ date : -1 })
        // .limit(20)
        // .exec(function(err, messages) {
            // if (err)
                // res.send(err);
            // res.json(messages);
        // });
    })
    .delete(function(req,res){
        // Message
        // .remove({ course: req.params.course })
        // .exec(function(err) {
            // if (err)
                // res.send(err);
            // res.json({ message: 'Messages deleted!' });
        // });
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port ' + port);
