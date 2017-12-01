var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DmcaRequestSchema = new Schema({
    image_collection: { type: mongoose.Schema.Types.ObjectId, ref: 'ImageCollection', required: true },
    body: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    date: Date
});

module.exports = mongoose.model('DmcaRequest', DmcaRequestSchema);