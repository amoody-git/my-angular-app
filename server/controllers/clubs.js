const Club = require('../models/club');

exports.getAllClubs = (req, res, next) => {
    Club.find()
        .then(documents => {
            res.status(200).json(documents);
        });
};