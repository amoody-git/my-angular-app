const express = require('express');
const PositionsController = require('../controllers/positions');

const router = express.Router();

router.get('', PositionsController.getAllPositions);

module.exports = router;