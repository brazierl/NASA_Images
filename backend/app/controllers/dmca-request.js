// use a configuration file
var config = require('../config');

var mongoose = require('mongoose');
var Collection = mongoose.model('ImageCollection');
var DmcaRequest = mongoose.model('DmcaRequest');
var nodemailer = require('nodemailer');
const notifier = require('mail-notifier');
var http = require("http");
var querystring = require('querystring');
const util = require('util');
const setIntervalPromise = util.promisify(setInterval);

// smtp config

let transporter = nodemailer.createTransport({
    host: config.mailserver.smtphost,
    port: config.mailserver.smtpport,
    secure: config.mailserver.smtpsecure,
    auth: {
        user: config.mailserver.email,
        pass: config.mailserver.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// imap config
const imap = {
    user: config.mailserver.email,
    password: config.mailserver.password,
    host: config.mailserver.imaphost,
    port: config.mailserver.imapport, // imap port
    tls: config.mailserver.imapsecure,// use secure connection
    tlsOptions: { rejectUnauthorized: false },
    markSeen: true
};

// Callback function called when a mail is beeing received
function callbackOnMail(mail) {
    console.log('Mail receveived: ' + mail.subject);
    var splitSubject = mail.subject.split(':');
    if (splitSubject.length == 2) {
        const request = {
            collection: splitSubject[0],
            from: '"' + mail.from[0].name + '" <' + mail.from[0].address + '>',
            body: mail.text,
            subject: splitSubject[1],
            date: new Date(mail.date)
        }

        const stringifyRequest = querystring.stringify(request);
        // HTTP post options
        const options = {
            hostname: config.apihostname,
            port: config.apiport,
            path: config.dmca.requestpath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(stringifyRequest)
            }
        };
        const req = http.request(options, (res) => {
            let rawData = '';
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                const parsedData = JSON.parse(rawData);
                if (parsedData.message) {
                    console.log(parsedData.message);
                }
                else {
                    console.log('Error: Could not submit DMCA request.');
                }
            });
        });
        req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
        });
        req.write(stringifyRequest);
        req.end();
    }
}

// Start the mail notificator to handle new request
notifier(imap)
    .on('connected', function () {
        console.log('Checking email for DMCA request.');
    })
    .on('mail', callbackOnMail)
    .on('error', function (err) {
        console.error(err.message);
    })
    .start();

// Create a DMCA Request in the DB
module.exports.createRequest = function (req, res) {
    Collection.findById(req.body.collection)
        .populate('user')
        .exec(function (err, collection) {
            if (err)
                res.send(err);
            else {
                if (collection) {
                    var request = new DmcaRequest();
                    request.image_collection = req.body.collection;
                    request.from = req.body.from;
                    request.body = req.body.body;
                    request.subject = req.body.subject;
                    request.date = req.body.date;
                    request.state = 'pending';
                    request.save(function (err) {
                        if (err)
                            res.send(err);
                        else {

                        }
                    });
                } else {
                    console.log("Could not find matching collection.");
                    res.send(new Error("Could not find matching collection."));
                }
            }
        });
}

// Get all DMCA requests
module.exports.getRequests = function (req, res) {
    DmcaRequest.find()
        .populate('image_collection')
        .exec(function (err, requests) {
            if (err)
                res.send(err);
            else
                res.json(requests);
        });
}

// Update a DMCA Request to the state "Handled" and send a notification to the author
module.exports.updateRequest = function (req, res) {
    DmcaRequest.findById(req.params.id)
        .populate('image_collection')
        .populate({
            path: 'image_collection',
            populate: {
                path: 'user',
                model: 'User'
            }
        })
        .exec(function (err, request) {
            if (err)
                res.send(err);
            else {
                if (request) {
                    request.state = 'handled';
                    request.save(function (err) {
                        if (err)
                            res.send(err);
                        else {
                            let mailOptions = {
                                from: 'Do Not Reply <' + config.mailserver.email + '>', // sender address
                                to: request.image_collection.user.email, // list of receivers
                                subject: 'DCMA notice', // Subject line
                                text: 'Hello,\n Your collection "' + request.image_collection.name + '" (' + config.dmca.collectionurl + '/' + request.image_collection._id + ') might infringe DMCA.'
                                    + '\nFrom: ' + request.from
                                    + '\nSubject: ' + request.subject
                                    + '\nReason: ' + request.body
                                    + '\nPlease regularize the situation or your collection will be deleted.'
                                    + '\nThank you for your cooperation.', // plain text body
                                html: '<p>Hello,<br/> Your collection "' + request.image_collection.name + '" (' + config.dmca.collectionurl + '/' + request.image_collection._id + ') might infringe DMCA.'
                                    + '<br/>From: ' + request.from
                                    + '<br/>Subject: ' + request.subject
                                    + '<br/>Reason: ' + request.body
                                    + '<br/>Please regularize the situation or your collection will be deleted.'
                                    + '<br/>Thank you for your cooperation.</p>' // html body
                            };

                            // send mail with defined transport object
                            transporter.sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error);
                                    res.send(err);
                                } else {
                                    console.log("DCMA taken in account. The author had been notified.");
                                    res.json({ message: "DCMA taken in account. The author has been notified." });
                                }
                            });
                        }
                    });
                } else {
                    res.send(new Error("Could not find the request."));
                }
            }
        });
}