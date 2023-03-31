const createError = require('http-errors');
const _ = require('lodash');
const { Task } = require('../models');

const checkBody = (body) => _.pick(body, ['content','isDone','deadLine']);

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { paginate = {} } = req;
    const tasks = await Task.findAll({ ...paginate });
    // if (!tasks) {
    //   return next(createError(404, 'Not found'));
    // }
    res.status(200).send({ data: tasks });

  } catch (error) {
    next(error)
  }
};


module.exports.createTask = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const value = checkBody(body);
    const task = await userInstance.createTask(body);
    if (!task) {
      return next(createError(400, 'Check your data'));
    }
    res.status(201).send({ data: task });
  } catch (error) {
    next(error)
  }
};
module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, paginate = {} } = req;
    const tasks = await userInstance.getTasks({ ...paginate });
    if (!tasks) {
      return next(createError(404, 'Not found'));
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteUserTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    await taskInstance.destroy();
    if (taskInstance) {
      return next(createError(412, 'Precondition Failed'));
    }
    res.status(200).send('task delete');
  } catch (error) {
    next(error);
  }
};
module.exports.updateTask = async (req, res, next) => {
  try {
    const { body, taskInstance } = req;
    const value = checkBody(body);
    const taskUpdated = await taskInstance.update(value, {
      returning: true
    })
    if (!taskUpdated) {
      return next(createError(400, 'Bad request'));
    }
    res.status(202).send({ data: taskUpdated })
  } catch (error) {
    next(error);
  }
};
