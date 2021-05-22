const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoute = require('./homeRoute');
const dashRoute = require('./dashRoute');


router.use('/', homeRoute);
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoute);

module.exports = router;