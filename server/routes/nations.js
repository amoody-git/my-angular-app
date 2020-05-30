const express = require('express');
const NationsController = require('../controllers/nations');

const router = express.Router();

router.get('', NationsController.getAllNations);

module.exports = router;