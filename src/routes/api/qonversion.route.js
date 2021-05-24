const express = require('express');

const router = express.Router();
const controller = require('../../controllers/qonversion');
const qonversion = require('../../middlewares/qonversion');

router.post('/webhook', qonversion, controller.webhook);

module.exports = router;
