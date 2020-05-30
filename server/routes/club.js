const express = require('express');
const checkAuth = require('../middleware/check-auth');
const ClubController = require('../controllers/club');

const router = express.Router();

router.get('/:id', ClubController.getClubById);

router.post('', checkAuth, ClubController.createClub);

router.put('/:id', checkAuth, ClubController.updateClub);

module.exports = router;