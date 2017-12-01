var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
    image_collection: { type: mongoose.Schema.Types.ObjectId, ref: 'ImageCollection' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    value: Number
});

ImageSchema.index({ user: 1, image_collection: 1 }, { unique: true });

module.exports = mongoose.model('Image', ImageSchema);