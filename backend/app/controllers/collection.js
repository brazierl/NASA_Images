var mongoose = require('mongoose');
var Collection = mongoose.model('ImageCollection');
var Image = mongoose.model('Image');

module.exports.getPublicCollections = function (req, res) {
    Collection.find({ 'visibility': "public" })
        .populate('user')
        .exec(function (err, collections) {
            if (err)
                res.send(err);
            else
                res.json(collections);
        });
}

module.exports.getMyCollections = function (req, res) {
    Collection.find({ 'user.usernam': req.params.username })
        .populate('user')
        .exec(function (err, collections) {
            if (err)
                res.send(err);
            else
                res.json(collections);
        });
}

module.exports.getCollection = function (req, res) {
    Collection.findById(req.params.collection_id, function (err, collection) {
        if (err)
            res.send(err);
        else
            res.json(collection);
    });
}

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

module.exports.updateCollection = function (req, res) {
    Collection.findById(req.params.collection_id, function (err, collection) {
        if (err)
            res.send(err);

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
    });
}

module.exports.deleteCollection = function (req, res) {
    Collection.remove({
        _id: req.params.collection_id
    }, function(err, collection) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Collection deleted' });
    });
}