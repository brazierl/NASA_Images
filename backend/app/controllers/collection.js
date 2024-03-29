var mongoose = require('mongoose');
var Collection = mongoose.model('ImageCollection');
var Image = mongoose.model('Image');
var User = mongoose.model('User');

// Get all public collections
module.exports.getPublicCollections = function (req, res) {
    Collection.find({ 'visibility': "public" })
        .populate('user')
        .exec(function (err, collections) {
            console.log(collections);
            if (err)
                res.send(err);
            else
                res.json(collections);
        });
}

// Get a user's collections
module.exports.getUserCollection = function (req, res) {
    User.findOne({ username: req.params.username })
        .exec(function (err, user) {
            if (user) {
                Collection.find({ 'user': user._id }, null)
                    .populate('user')
                    .exec(function (err, collections) {
                        if (err)
                            res.send(err);
                        else
                            res.json(collections);
                    });
            }
            else {
                res.status(401).send('User not found');
            }
        });
}

// Get a specific collection
module.exports.getCollection = function (req, res) {
    Collection.findById(req.params.collection_id, function (err, collection) {
        if (err)
            res.send(err);
        else
            res.json(collection);
    });
}

// Create a collection in the DB
module.exports.saveCollection = function (req, res) {
    var collection = new Collection();
    collection.name = req.body.name;
    collection.description = req.body.description;
    collection.visibility = req.body.visibility;
    collection.user = req.body.user;

    collection.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Collection created!' });
    });
}

// Update an exisiting collection
module.exports.updateCollection = function (req, res) {
    Collection.findById(req.params.collection_id, function (err, collection) {
        if (err)
            res.send(err);
        else {
            collection.name = req.body.name;
            collection.description = req.body.description;
            collection.visibility = req.body.visibility;
            collection.user = req.body.user;

            collection.save(function (err) {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'Collection updated!' });
            });
        }
    });
}

// Remove a collection from the database
module.exports.deleteCollection = function (req, res) {
    Collection.remove({
        _id: req.params.collection_id
    }, function (err, collection) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Collection deleted' });
    });
}