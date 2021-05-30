
const router = require('express').Router();
const { Users, Posts, Comments } = require('../../models');
const withAuth = require('../../utils/auth');



router.get('/', async (req, res) => {

    try{

        const userData = await Users.findAll({
            attributes: {
                exclude: ['password']
            }
            
        });

        res.status(200).json(userData);

    }catch (err) {
        console.log(err);
        res.status(500).json(err)

    }
});


router.get('/:id', async (req, res) => {

    try{

        const userData = await Users.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Posts,
                    attributes:[
                        'id',
                        'title',
                        'render_text',
                        'created_at'

                    ]
                },
                {
                    model: Comments,
                    attributes: [
                        'id',
                        'comment_id',
                        'created_at'
                    ]
                }
            ]
        });

        if (!userData) {
            res.status(400).json({message: 'Sorry, no user found with this id' });
            return;
        }

            res.status(200).json(userData);

    }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
});


router.post('/', withAuth, async (req, res) => {
    try {

        const userData = await Users.create({
            username: req.body.username,
            password: req.body.password,
        });
       

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err)

    }

});

router.post('/login', async (req, res) => {

    try{

        const userData = await Users.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userData){
            res.status(400).json({message: 'Sorry, incorrect username or password. Please try again!'});
            return;
        }

        const validUser = await userData.checkPassword(req.body.password);

        if (!validUser){
            res.status(400).json({message: 'Sorry, incorrect username or password. Please try again!'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
      
            res.status(200).json({ user: userData, message: 'Success! You are now logged in!' });
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
     
});


router.put('/:id', withAuth, async (req, res) => {
    
    try{
        
        const userData = await Users.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });
        
        if (!userData){
            res.status(400).json({message: 'Sorry, incorrect username or password. Please try again!'});
            return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
            
            res.status(200).json(userData);
        });
        
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;