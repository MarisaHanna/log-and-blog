const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Users extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}


Users.init(

    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username:{
            type: DataTypes.STRING,
            allowNull: false
        },

        // email:{
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        //     validate:{
        //         isEmail: true
        //     }
        // },

        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[6]
            }
        }
    },

    {

        hooks:{
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
              },

              beforeUpdate: async (updatedUser) => {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                return updatedUser;
              },
            },

            sequelize,
            timestamps:false,
            freezeTableName: true,
            underscored: true,
            modelName: 'users'
        }
    
);

module.exports = Users;