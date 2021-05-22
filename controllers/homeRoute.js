const router = require('express').Router();
const { Posts, Comments, Users } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
//     res.render('login');
// });
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

        res.render('home', {
            userPosts, loggedIn: req.session.loggedIn
        });

    }catch (err) {
        res.status(500).json(err);
    }
   
});

router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return
    // }
    res.render('login');
});


router.get('/posts/:id', async (req, res) => {
    try{
        const onePost = await Posts.findByPk(req.params.id, {
            attributes: [
                'id',
                'title', 
                'created_at', 
                'render_text'
            ],
            include: [
                {
                    model: Comments,
                    attributes: ['id', 'comment_id', 'post_id', 'user_id', 'created_at'],
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
        const single = onePost.get({plain: true});
        res.render('single', {single, loggedIn: req.session.loggedIn})
    
    }catch (err) {
        res.status(500).json(err)
    }
        
});
 






module.exports = router;