var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String,
    description: String,
    visibility: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('ImageCollection', CollectionSchema);