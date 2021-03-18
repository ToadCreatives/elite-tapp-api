const express = require('express');

const router = express.Router();
const { validate } = require('express-validation');
const auth = require('../../middlewares/auth');
const controller = require('../../controllers/links');
const validation = require('../../validations/link.validation');

router.get('/', auth(), controller.list);

router.post('/', validate(validation.createLink), auth(), controller.createLink);

router.put('/:id', validate(validation.updateLink), auth(), controller.updateLink);

router.delete('/:id', validate(validation.deleteLink), auth(), controller.deleteLink);

module.exports = router;
