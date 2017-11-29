var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    visibility: {
        type: String,
        required: true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

CollectionSchema.pre('remove', function(next) {
    Image.remove({image_collection: this._id}).exec();
    next();
});

module.exports = mongoose.model('ImageCollection', CollectionSchema);