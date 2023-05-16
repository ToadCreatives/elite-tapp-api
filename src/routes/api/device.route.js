const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/devices');
const validation = require('../../validations/device.validation');

router.get('/list', auth(), controller.getDevices);

router.get('/user/:deviceUid', validate(validation.getUser), controller.getUser);

router.patch('/:id', validate(validation.updateDevice), auth(), controller.updateDevice);

router.delete('/:id', validate(validation.deleteDevice), auth(), controller.deleteDevice);

router.post('/register', validate(validation.registerNewDevice), auth(), controller.registerNewDevice);

module.exports = router;
