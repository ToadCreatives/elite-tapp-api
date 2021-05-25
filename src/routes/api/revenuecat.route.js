const express = require('express');

const router = express.Router();
const controller = require('../../controllers/revenuecat');
const revenueCat = require('../../middlewares/revenuecat');

router.post('/webhook', revenueCat(), controller.webhook);

module.exports = router;
