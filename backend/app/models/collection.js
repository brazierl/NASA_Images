var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String,
    description: String,
    visibility: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

CollectionSchema.pre('remove', function(next) {
    Image.remove({image_collection: this._id}).exec();
    next();
});

module.exports = mongoose.model('ImageCollection', CollectionSchema);