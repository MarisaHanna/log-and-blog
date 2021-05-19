const router = require('express').Router();
// const {Post, User, Comments} = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    res.render('home');
});




module.exports = router;