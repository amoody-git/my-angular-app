const mongoose = require('mongoose');

const nationSchema = mongoose.Schema({
    name: { type: String, required: true }, 
    flagUrl: { type: String, required: true }
}); 

module.exports = mongoose.model('Nation', nationSchema);