const Club = require('../models/club');

exports.getClubById = (req, res, next) => {
    Club.findById(req.params.id).then(document => {
        if (document) {
            res.status(200).json(document);
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
        .then(createdDocument => {
            res.status(201).json(createdDocument);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to create club!" })
        });
};

exports.updateClub = (req, res, next) => {
    const club = new Club({
        _id: req.params.id,
        name: req.body.name,
        crestUrl: req.body.crestUrl, 
        website: req.body.website,  
        color: req.body.color, 
        venue: req.body.venue
    });

    Club.updateOne({ _id: req.params.id }, club)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json("Club updated successfully!");
            } else {
                res.status(401).json({ message: "User is not authorized!" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to update club!" })
        });
}