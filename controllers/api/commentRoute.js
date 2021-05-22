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


router.delete('/:id', async (req, res) => {

    try{

        const userData = await Comments.destroy({

            where: {
                id: req.params.id
            }

        });

        if (!userData){
            res.status(404).json({message:'No comment found with this id'});
            return;
        }

        res.status(200).json(userData);

    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;
