const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const PicblogSchema = new Schema({
    title: String,
    description: String,
    location: String
});

module.exports = mongoose.model('Picblog', PicblogSchema);