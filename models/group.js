'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    imagePath: {
      field: 'image_path',
      type: DataTypes.TEXT,
      // allowNull: false,
      // validate:{
      //   notNull: true,  
      //   notEmpty: true,
      // }
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'groups',
    underscored: true,
  });
  return Group;
};