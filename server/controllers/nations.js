const Nation = require('../models/nation');

exports.getAllNations = (req, res, next) => {
    Nation.find()
        .then(documents => {
            res.status(200).json(documents);
        });
};