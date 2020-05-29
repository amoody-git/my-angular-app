const express = require('express');
const checkAuth = require('../middleware/check-auth');
const ClubController = require('../controllers/club');

const router = express.Router();

router.get('/clubs', ClubController.getAllClubs);

router.get('/club/:id', ClubController.getClubById);

router.post('/club', checkAuth, ClubController.createClub);

module.exports = router;