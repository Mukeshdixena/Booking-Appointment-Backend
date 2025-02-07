const express = require('express');
const infoController = require('../controllers/infoControllers');

const router = express.Router();

router.get('/api/getInfo', infoController.getInfo);
router.post('/api/postInfo', infoController.postInfo);
router.delete('/api/deleteInfo/:infoId', infoController.deleteInfo);
router.put('/api/editInfo/:editId', infoController.editInfo);

module.exports = router;
