const express = require('express');
const infoController = require('../controllers/infoControllers');

const router = express.Router();

// Corrected the route path and methods
router.get('/api/getInfo', infoController.getInfo);   // For fetching the info
router.post('/api/postInfo', infoController.postInfo); // For posting the info

module.exports = router;
