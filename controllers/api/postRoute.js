const router = require('express').Router();
const {Posts, Users, Comments} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {

    try{

        const userData = await Posts.findAll({
            attributes: [
                'id',
                'title',
                'render_text',
                'created_at'

            ],

            order:[['created_at', 'DESC']],
            include: [{
                model: Users,
                attributes:['username']
        },
        {
            model: Comments,
            attributes: [
                'id',
                'comment_id',
                'post_id',
                'user_id',
                'created_at'
            ],
            include: {
                model: Users,
                attributes:['username']
            }
        }]
        
      });
      res.status(200).json(userData);

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {

    try{

        const userData = await Posts.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'render_text',
                'created_at'
            ],
            include: [
                {
                    model: Users,
                    attributes: ['username']
                },
                {
                    model: Comments,
                    attributes: [
                        'id',
                        'user_id',
                        'post_id',
                        'comment_id',
                        'created_at'
                    ],
                    include: {
                        model: Users,
                        attributes: ['username']
                    }
                }
            ]
        });

       

        res.json(userData);

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/',withAuth, async (req, res) => {

    try{

        const userData = await Posts.create({
            title: req.body.title,
            render_text: req.body.render_text,
            user_id: req.session.user_id

        });

        res.status(200).json(userData);

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id',withAuth, async (req, res) => {

    try{

        const userData = await Posts.update(req.body,{
           
            where: {
                id: req.params.id

            }
        });

            if (!userData) {
                res.status(400).json({message: 'Sorry, no posts found with this id' });
                return;
            }
        
            res.status(200).json(userData);
    
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

});

router.delete('/:id', withAuth,async (req, res) => {

    try{

        const userData = await Posts.destroy({
        
             where: {
                id: req.params.id

            }
        });

            if (!userData) {
                res.status(400).json({message: 'Sorry, no posts found with this id' });
                return;
            }

            res.status(200).json(userData);
    
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }

});



module.exports = router;