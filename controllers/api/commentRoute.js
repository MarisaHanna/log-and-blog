const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {

    try{
        const userData = await Comments.findAll();

        res.status(200).json(userData);

    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {

    try{

        const userData = await Comments.create({

            render_text: req.body.render_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });

        res.status(200).json(userData);

    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
   
    
});

