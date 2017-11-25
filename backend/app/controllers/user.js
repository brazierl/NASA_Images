var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');

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

    user.save(function (err) {
        if (err)
            res.send(err);
        else {
            var token;
            token = user.generateJwt();
            res.json({
                "token": token
            });
        }
    });
};

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