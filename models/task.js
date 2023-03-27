'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(
        models.User,
        {foreignKey:'userId'}
        )
    }
  }
  Task.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }

    },
    isDone: {
      field: 'is_done',
      defaultValue: false,
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true
      }
    }
    ,
    deadLine: {
      type: DataTypes.DATE,
      field: 'dead_line',
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true
  });
  return Task;
};