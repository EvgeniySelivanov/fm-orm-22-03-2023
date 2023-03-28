const { Router } = require('express');
const TaskController = require('./controllers/task.controller');
const { checkUser } = require('./middlewares/user.mw');
const { checkTask } = require('./middlewares/task.mw');
const taskRouter=Router();

taskRouter.post('/', TaskController.createTask);
taskRouter.get('/', TaskController.getUserTasks);
taskRouter.delete('/:idTask', checkUser, checkTask, TaskController.deleteUserTask);
taskRouter.patch('/:idTask', checkUser, checkTask, TaskController.updateTask);

module.exports=taskRouter;