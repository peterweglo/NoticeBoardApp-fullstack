const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.post('/ads', imageUpload.single('image'), AdsController.addNew);
router.put('/ads/:id', imageUpload.single('image'), AdsController.editById);
router.delete('/ads/:id', AdsController.deleteById);
router.get('/search/:searchPhrase', AdsController.getBySearch);

module.exports = router;
