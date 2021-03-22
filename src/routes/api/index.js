const express = require('express');

const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const profileRouter = require('./profile.route');
const interestsRoute = require('./interests.route');
const devicesRoute = require('./device.route');
const linksRoute = require('./link.route');
const connectionRoute = require('./connection.route');

router.get('/status', (req, res) => { res.send({ status: 'OK' }); }); // api status

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/profile', profileRouter);
router.use('/interests', interestsRoute);
router.use('/devices', devicesRoute);
router.use('/links', linksRoute);
router.use('/connection', connectionRoute);

module.exports = router;
