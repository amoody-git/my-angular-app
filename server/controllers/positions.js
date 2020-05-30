const Position = require('../models/position');

exports.getAllPositions = (req, res, next) => {
    Position.find()
        .then(documents => {
            res.status(200).json(documents);
        });
};