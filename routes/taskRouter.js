const { Router } = require('express');
const { checkUser } = require('../middlewares/user.mw');
const { checkTask } = require('../middlewares/task.mw');
const paginate = require('../middlewares/paginate.mw');
const taskRouter = Router();

const TaskController = require('../controllers/task.controller');



taskRouter.get('/', paginate, TaskController.getAllTasks);



taskRouter.post('/users/:idUser', checkUser, TaskController.createTask);



taskRouter.get('/users/:idUser', checkUser, paginate, TaskController.getUserTasks);

taskRouter.delete('/:idTask/users/:idUser', checkUser, checkTask, TaskController.deleteUserTask);

taskRouter.patch('/:idTask/users/:idUser', checkUser, checkTask, TaskController.updateTask);

module.exports = taskRouter;