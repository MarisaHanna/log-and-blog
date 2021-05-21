const router = require('express').Router();
const apiRoute = require('./apiRoute');

router.use('/user', apiRoute);

module.exports = router;