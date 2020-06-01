const Player = require('../models/player');

exports.searchPlayers = (req, res, next) => {
    const queryParams = {};
    
    const club = req.query.club;
    if (club) {
        queryParams.club = club;
    }
    
    const playerQuery = Player.find(queryParams);

    const currentPage = +req.query.page;
    const pageSize = +req.query.pagesize;
    
    if (currentPage && pageSize) {
        playerQuery
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);
    }

    playerQuery
        .populate('position')
        .populate('nationality')
        .exec((err, documents) => {
            res.status(200).json(documents);
        });
}