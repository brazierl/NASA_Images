var mongoose = require('mongoose');
var Collection = mongoose.model('ImageCollection');
var Image = mongoose.model('Image');

module.exports.getImages = function (req, res) {
    Image.find({ 'image_collection': req.params.collection_id })
        // .populate('image_collection')
        // .populate('user')
        .exec(function (err, images) {
            if (err)
                res.send(err);
            else
                res.json(images);
        });
}

module.exports.saveImage = function (req, res) {
    var image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.url = req.body.url;
    image.image_collection = req.body.image_collection;
    
    image.save(function (err) {
        if (err)
            res.send(err);
        else
            res.json({ image: 'Image created!' });
    });
}

module.exports.deleteImage = function (req, res) {
    Image.remove({
        _id: req.params.image_id
    }, function(err, image) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Image deleted' });
    });
}


