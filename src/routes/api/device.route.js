const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/devices');
const validation = require('../../validations/device.validation');

router.get('/list', auth(), controller.getDevices);
router.patch('/:deviceId', validate(validation.updateDevice), auth(), controller.updateDevice);
router.delete('/:deviceId', validate(validation.deleteDevice), auth(), controller.deleteDevice);
router.post('/create', auth(), controller.createNewDevice);

module.exports = router;
