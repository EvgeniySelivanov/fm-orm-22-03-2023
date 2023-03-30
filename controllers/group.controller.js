const createError = require('http-errors');
const _ = require('lodash');
const { Group } = require('../models');
const { User } = require('../models');


module.exports.createUserGroup = async (req, res, next) => {
  try {
    const { body, file: { filename } } = req;
    const values = _.pick(body, ['name', 'description', 'isAdult']);
    const group = await Group.create(values);
    if (!group) {
      return next(createError(400, 'Bad request'))
    }
    //get user and pin his to group
    const user = await User.findByPk(body.userId);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    await group.addUser(user);

    const updatedGroup = await Group.update(
      { imagePath: filename },
      {
        where: { id: group.id },
        returning: true
      })
    res.status(201).send({ data: group, data: updatedGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const { params: { idUser } } = req;
    const userWithGroups = await User.findByPk(idUser, {
      include: {
        model: Group,
        through: {
          attributes: []
        }
      }
    });
    if (!userWithGroups) {
      return next(createError(404, 'Not found'));
    }
    res.status(200).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};
module.exports.addImageGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      file: { filename }
    } = req;
    const [rowCount, updatedGroup] = await Group.update(
      { imagePath: filename },
      {
        where: { id: idGroup },
        returning: true
      }
    );
    res.status(200).send({ data: updatedGroup });
  } catch (error) {
    next(error);
  }
};

