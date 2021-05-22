const router = require('express').Router();
const apiRoute = require('./userRoute');
const postRoute = require('./postRoute');

router.use('/users', apiRoute);
router.use('/posts', postRoute);

module.exports = router;