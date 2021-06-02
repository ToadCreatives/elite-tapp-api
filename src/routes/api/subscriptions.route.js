const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/subscriptions');

router.get('/my', auth(), controller.get);

router.post('/refresh', auth(), controller.refresh);

module.exports = router;
