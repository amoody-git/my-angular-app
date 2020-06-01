const express = require('express');
const checkAuth = require('../middleware/check-auth');
const PlayerController = require('../controllers/player');

const router = express.Router();

router.get('/:id', PlayerController.getPlayerById);

router.post('', checkAuth, PlayerController.createPlayer);

router.put(':/id', checkAuth, PlayerController.updatePlayer);

module.exports = router;