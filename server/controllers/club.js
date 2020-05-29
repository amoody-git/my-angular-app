const Club = require('../models/club');

exports.getAllClubs = (req, res, next) => {
    Club.find()
        .then(documents => {
            res.status(200).json(documents);
        });
};

exports.getClubById = (req, res, next) => {
    Club.findById(req.params.id).then(club => {
        if (club) {
            res.status(200).json(club);
        } else {
            res.status(404).json({ message: "Club not found!" });
        }
    })
};

exports.createClub = (req, res, next) => {
    const club = new Club({
        name: req.body.name,
        crestUrl: req.body.crestUrl, 
        website: req.body.website,  
        color: req.body.color, 
        venue: req.body.venue
    });
    club.save()
        .then(createdClub => {
            res.status(201).json(createdClub);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to create club!" })
        });
};