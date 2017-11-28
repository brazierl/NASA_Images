var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    url: String,
    title: String,
    description: String,
    image_collection: {type: mongoose.Schema.Types.ObjectId, ref: 'ImageCollection'}
});

module.exports = mongoose.model('Image', ImageSchema);