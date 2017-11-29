var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    title: String,
    description: String,
    image_collection: { type: mongoose.Schema.Types.ObjectId, ref: 'ImageCollection' }
});

ImageSchema.index({ url: 1, image_collection: 1 }, { unique: true });

module.exports = mongoose.model('Image', ImageSchema);