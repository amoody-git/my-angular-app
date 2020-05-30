const Player = require('../models/player');

exports.searchPlayers = (req, res, next) => {
    const queryParams = {};
    
    const clubId = req.query.clubId;
    if (clubId) {
        queryParams.club = clubId;
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
        .then(documents => {
            res.status(200).json(documents);
        });
}