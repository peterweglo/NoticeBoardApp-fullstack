const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');

router.get('/ads', AdsController.getAll);
router.get('/ads/:id', AdsController.getById);
router.post('/ads', AdsController.addNew);
router.put('/ads/:id', AdsController.editById);
router.delete('/ads/:id', AdsController.deleteById);
router.get('/search/:searchPhrase', AdsController.getBySearch);

module.exports = router;
