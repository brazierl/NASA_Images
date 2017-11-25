var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    id: String,
    url: String,
    title: String,
    description: String,
    date: Date
});

module.exports = mongoose.model('Image', ImageSchema);