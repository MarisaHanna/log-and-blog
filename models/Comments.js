const { Model, DataTypes } = require('sequelize');
const sequelize =require('../config/connection');

class Comments extends Model {}

Comments.init(

    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'user',
                key: 'id'
            }
        },

        post_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts',
                key: 'id'
            }
        },

        comment_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
          } 
        },
        {
            sequelize,
            freezeTableName: true,
            underscored: true,
            modelName: 'comments'
        }
);

module.exports = Comments;