const express = require('express');
const checkAuth = require('../middleware/check-auth');
const PlayerController = require('../controllers/player');

const router = express.Router();

router.post('', checkAuth, PlayerController.createPlayer);

module.exports = router;