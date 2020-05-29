const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    name: { type: String, required: true },
    crestUrl: { type: String, required: true },
    website: { type: String, required: true }, 
    color: { type: String, required: true },
    venue: { type: String, required: true }
});

module.exports = mongoose.model('Club', clubSchema);