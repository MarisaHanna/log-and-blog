const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(

    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        title:{
            type: DataTypes.STRING,
            allowNull: false
        },

        render_text:{
            type: DataTypes.TEXT,
            allowNull: true
        },

        user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts'
    }
);

module.exports = Posts;