const express = require('express');
const PlayersController = require('../controllers/players');

const router = express.Router();

router.get('', PlayersController.searchPlayers);

module.exports = router;