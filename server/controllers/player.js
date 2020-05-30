const Player = require('../models/player');

exports.createPlayer = (req, res, next) => {
    const player = new Player({
        name: req.body.name,
        position: req.body.positionId, 
        shirtNumber: req.body.shirtNumber,
        nationality: req.body.nationId, 
        imageUrl: req.body.imageUrl, 
        club: req.body.clubId
    });
    player.save()
        .then(createdPlayer => {
            res.status(201).json(createdPlayer);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to create player!" })
        });
};