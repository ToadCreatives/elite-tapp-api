const express = require('express');

const router = express.Router();
const controller = require('../../controllers/qonversion');

router.post('/webhook', controller.webhook);

module.exports = router;
