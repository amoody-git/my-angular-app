const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    name: { type: String, required: true },
    position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
    shirtNumber: { type: Number }, 
    nationality: { type: mongoose.Schema.Types.ObjectId, ref: 'Nation' }, 
    imageUrl: { type: String },
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' }
});

module.exports = mongoose.model('Player', playerSchema);