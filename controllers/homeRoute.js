const router = require('express').Router();
const { Posts, Comments, Users } = require('../models');
const withAuth = require('../utils/auth');


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/alert', (req, res) => {
    res.render('alert');
});


router.get('/', async (req, res) => {

    try{
        const postData = await Posts.findAll({
            attributes:[
                'id',
                'title',
                'created_at',
                'render_text'
            ],

            include: [{

                model: Comments,
                attributes: ['id', 'comment_id', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: Users,
                    attributes: ['username']
                }
                },
                {

                    model: Users,
                    attributes:['username']

                }]
         });

        const userPosts = postData.map((posts) => posts.get({plain: true}));
         console.log(userPosts);
        res.render('home', {
            userPosts, loggedIn: req.session.loggedIn
        });
       

    }catch (err) {
        res.status(500).json(err);
    }
   
});


router.get('/posts/:id', withAuth, async (req, res) => {
    try{
        const onePost = await Posts.findOne({
            where:{
                id: req.params.id 
            },    
            attributes: [
                'id',
                'title', 
                'created_at', 
                'render_text'
            ],
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'user_id', 'post_id', 'comment_id', 'created_at'],
                    include: {
                        model: Users,
                        attributes:['username']
                    }
        
                },
                {
                    model: Users,
                    attributes: ['username']
                }
            ]
        })
        const post = onePost.get({plain: true});
        res.render('single', { post, loggedIn: req.session.loggedIn
        });
       
    
    }catch (err) {
        res.status(500).json(err)
    }
        
});
 
router.get('/logout', async (req, res) => {

        req.session.destroy(() => {
            res.render('logout');
        });
    
});

module.exports = router;