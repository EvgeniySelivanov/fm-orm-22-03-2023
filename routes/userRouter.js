const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const { checkUser } = require('./middlewares/user.mw');
const userRouter = Router();

//users
//http://localhost:3000/api
userRouter.post('/', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:idUser', checkUser, UserController.getUser);
userRouter.patch('/:idUser', checkUser, UserController.updateUser);
userRouter.patch('/instance/:idUser', checkUser, UserController.updateUserInstance);
userRouter.delete('/:idUser', checkUser, UserController.deleteUser);

module.exports = userRouter;