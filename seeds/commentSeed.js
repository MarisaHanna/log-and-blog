const { Comments } = require('../models');

const commentData = [
    {
        user_id: 1,
        post_id: 5,
        comment_id: "This is amazing!"
    },
    {
        user_id: 4,
        post_id: 4,
        comment_id: "Wow, amazing work!"
    },
    {
        user_id: 1,
        post_id: 4,
        comment_id: "Awesome! kudos to everyone who have contributed"
    },
    {
        user_id: 3,
        post_id: 5,
        comment_id: "We just reached a million subscribers! Fantastic!"
    },
    {
        user_id: 3,
        post_id: 2,
        comment_id: "This is great news!"
    },
  
]

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;