const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/subscriptions');

router.get('/my', auth(), controller.get);

module.exports = router;
