const createError = require('http-errors');
const { Op } = require("sequelize");
const { User } = require('../models');


module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await User.create(body);
    if (!createdUser) {
      return next(createError(400, 'Check your data'));
    }
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { paginate = {} } = req;
    const users = await User.findAll({
      ...paginate,
      attributes: { exclude: ['password'] },
      //attributes: ['id','email',['first_name','name']]
      // where:{
      //   // firstName:'Brad',
      //   // lastName:'Pitt'
      //   // [Op.or]:{
      //   //   id:{[Op.ne]:[1]}
      //   // }
      // }
    })
    if (!users) {
      return next(createError(404, 'Not Found'));
    }
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { body, params: { idUser } } = req;
    const [rowsCount, [updatedUser]] = await User.update(body, {
      where: {
        id: {
          [Op.eq]: idUser
        }
      },
      returning: ['email', 'last_name']
    });
    if (!updatedUser) {
      return next(createError(400, 'Bad request'));
    }
      res.status(202).send({ data: updatedUser })
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, params: { idUser } } = req;
    const userInstance = await User.findByPk(idUser);
    const userUpdated = await userInstance.update(body, {
      returning: true
    });
    if (!userUpdated) {
      return next(createError(400, 'Bad request'));
    }
    userUpdated.password = undefined;
    res.status(202).send({ data: userUpdated })
  } catch (error) {
    next(error);
  }
};
module.exports.deleteUser = async (req, res, next) => {
  try {
    const { params: { idUser } } = req;
    const userInstance = await User.findByPk(idUser, { attributes: { exclude: ['password'] } });
    await userInstance.destroy();
    if (userInstance) {
      return next(createError(412, 'Precondition Failed'));
    }
    res.status(200).send({ data: userInstance })
  } catch (error) {
    next(error);
  }
};


module.exports.getUser = async (req, res, next) => {
  try {
    const { params: { idUser } } = req;
    const user = await User.findByPk(idUser, { attributes: { exclude: ['password'] } });
    if (!user) {
      const error = createError(404, 'User not found');
      return next(error);
    }
    res.status(200).send({ data: user })
  } catch (error) {
    next(error);
  }
};

// module.exports.createUser = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
