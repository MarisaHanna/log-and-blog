const Comments = require('./Comments');
const Posts = require('./Posts');
const Users = require('./Users');


Users.hasMany(Posts,{
    foreignKey: 'user_id'
});

Posts.belongsTo(Users,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Users,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Posts,{
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Users.hasMany(Comments,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Posts.hasMany(Comments,{
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = {Users, Comments, Posts};