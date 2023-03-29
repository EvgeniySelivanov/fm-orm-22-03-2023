'use strict';
const { Model } = require('sequelize');
const { isAfter } = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { //"Users" -> "users"
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Task,
        { foreignKey: 'userId' }
      );
      User.belongsToMany(
        models.Group,
        {
          through: 'users_to_groups',
          foreignKey: 'userId'
        }
      )
    }
  }
  User.init(
    {
      firstName: {
        field: 'first_name',
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      email: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true,
        }
      },
      password: {
        field: 'password_hash',
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        set(value) {
          this.setDataValue('password', 'password_hash');
        }
      },
      birthday: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          //isBefore: new Date().toISOString()
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error('check birthday')
            }
          }
        }
      },
      isMale: {
        field: 'is_male',
        type: DataTypes.BOOLEAN
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      tableName: 'users'
    }
  );
  return User;
};
