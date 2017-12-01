// use a configuration file
var config = require('../config');

var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var TempUser = mongoose.model('TempUser');
nev = require('email-verification')(mongoose);

// email verification
nev.configure({
    verificationURL: config.emailverification.path,
    persistentUserModel: User,
    tempUserModel: TempUser,
    tempUserCollection: 'tempusers',
    emailFieldName: 'email',
    passwordFieldName: 'password',
    URLFieldName: 'GENERATED_VERIFYING_URL',

    transportOptions: {
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
    },
    verifyMailOptions: {
        from: 'Do Not Reply <' + config.mailserver.email + '>',
        subject: 'Please confirm account',
        html: '<h1>Please confirm account</h1><p>Click <a target="_blank" href="${URL}">this link</a> to confirm your account or go to ${URL}.</p>',
        text: 'Please confirm your account by navigating to this link: ${URL}'
    }
}, function (error, options) {
});

module.exports.profileRead = function (req, res) {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        // Otherwise continue
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                if (user)
                    res.status(200).json(user);
                else
                    res.status(401).send('User not found.');
            });
    }
};

module.exports.register = function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;

    nev.createTempUser(user, function (err, existingPersistentUser, newTempUser) {
        // some sort of error 
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            // user already exists in persistent collection
            if (existingPersistentUser) {
                console.log("User already exists! (Account confirmed)");
                res.send(new Error("User already exists! (Account confirmed)"));
            }
            else {
                // a new user 
                if (newTempUser) {
                    var URL = newTempUser[nev.options.URLFieldName];
                    nev.sendVerificationEmail(newTempUser.email, URL, function (err, info) {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        }
                        else {
                            console.log("User " + newTempUser.username + " created. Waiting for email verification.");
                            res.json({ message: "User created. Waiting for email verification." });
                        }
                    });

                } else {
                    console.log("User already exists! (Account pending for confirmation)");
                    res.send(new Error("User already exists! (Account pending for confirmation)"));
                }
            }
        }
    });
};

module.exports.verifyUser = function (req, res) {
    var url = req.params.id;
    nev.confirmTempUser(url, function (err, user) {
        if (err)
            console.log(err);

        // user was found!
        if (user) {
            nev.sendConfirmationEmail(user['email'], function (err, info) {
                res.redirect(config.emailverification.urlredirectsuccess);
            });
        }
        // user's data probably expired
        else
            res.redirect(config.emailverification.urlredirectfailure);
    });
}

module.exports.login = function (req, res) {
    passport.authenticate('local', function (err, user, info) {
        var token;
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.json({
                token: token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};