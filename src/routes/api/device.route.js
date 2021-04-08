const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/devices');
const validation = require('../../validations/device.validation');

router.get('/list', auth(), controller.getDevices);

router.get('/user/:token', auth(), controller.getUser);

router.patch('/:id', validate(validation.updateDevice), auth(), controller.updateDevice);

router.delete('/:id', validate(validation.deleteDevice), auth(), controller.deleteDevice);

router.post('/create', auth(), controller.createNewDevice);

module.exports = router;
