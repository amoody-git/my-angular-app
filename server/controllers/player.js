const Player = require('../models/player');

exports.getPlayerById = (req, res, next) => {
    Player.findById(req.params.id)
        .populate('position')
        .populate('nationality')
        .exec((err, player) => {
            if (player) {
                res.status(200).json(player);
            } else {
                res.status(404).json({ message: "Club not found!" });
            }
        })
};

exports.createPlayer = (req, res, next) => {
    const player = new Player({
        name: req.body.name,
        position: req.body.position, 
        shirtNumber: req.body.shirtNumber,
        nationality: req.body.nationality, 
        imageUrl: req.body.imageUrl, 
        club: req.body.club
    });
    player.save()
        .then(createdPlayer => {
            res.status(201).json(createdPlayer);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to create player!" })
        });
};

exports.updatePlayer = (req, res, next) => {
    const player = new Player({
        _id: req.params.id,
        name: req.body.name,
        position: req.body.position, 
        shirtNumber: req.body.shirtNumber,
        nationality: req.body.nationality, 
        imageUrl: req.body.imageUrl, 
        club: req.body.club
    });

    Player.updateOne({ _id: req.params.id }, player)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json("Player updated successfully!");
            } else {
                res.status(401).json({ message: "User is not authorized!" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to update player!" })
        });
} 