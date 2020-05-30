const express = require('express');
const ClubsController = require('../controllers/clubs');

const router = express.Router();

router.get('', ClubsController.getAllClubs);

module.exports = router;