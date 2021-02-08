'use strict';
const { hashPass } = require('../helpers/bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Wishlist)
    }
  };
  User.init({
    email:{
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'this email has been used'
      },
      validate: {
        notEmpty: {
          msg: 'please enter email'
        },
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please enter password'
        },
        len: {
          args: [6,200],
          msg: 'minimum password length 6 character'
        }
      }
    },
    saldo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        user.saldo = 5000000;
        user.password = hashPass(user.password)
      }
    }
  });
  return User;
};