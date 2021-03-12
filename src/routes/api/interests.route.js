const express = require('express');

const router = express.Router();
const controller = require('../../controllers/interests');

router.get('/', controller.getInterests);

module.exports = router;
