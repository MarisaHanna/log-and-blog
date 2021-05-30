const router = require('express').Router();
const { Posts, Comments, Users } = require('../models');
const withAuth = require('../utils/auth');

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

            const userPosts = userData.map((post) => post.get({plain: true}));
            console.log(userPosts);
            res.render('dashboard', { 
                userPosts, loggedIn: req.session.loggedIn
            });
    
        }catch (err) {
            res.status(500).json(err);

        }
});

router.get('/edit/:id', withAuth, async (req, res) => {

   try{

        const userData = await Posts.findOne({
            where: {
                id:req.params.id
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
                        'comment_id',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: Users,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (!userData){
            res.status(404).json({message:'No comment found with this id'});
            return
        }
       

        const userPosts = userData.get({plain: true})
        res.render('edit', {
            userPosts, loggedIn: req.session.loggedIn
        });
       

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
});

router.get('/new', withAuth, (req, res) => {
    res.render('new',{loggedIn: req.session.loggedIn})
});


module.exports = router;