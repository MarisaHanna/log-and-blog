const router = require('express').Router();
const apiRoute = require('./userRoute');

router.use('/user', apiRoute);

module.exports = router;