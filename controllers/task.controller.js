const { Task } = require('../models');

// module.exports.createTask=async(req,res,next)=>{
//   try {
//     const{params:{idUser},body}=req;
//     const task= await Task.create({...body,userId:idUser});
//     res.status(201).send({data:task})
//   } catch (error) {
//     next(error)
//   }
// }

module.exports.createTask = async (req, res, next) => {
  try {
    const { userInstance, body } = req;
    const task = await userInstance.createTask(body);
    res.status(201).send({ data: task })
  } catch (error) {
    next(error)
  }
}
module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const tasks = await userInstance.getTasks();
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    await taskInstance.destroy();
    res.status(200).send('task delete');
  } catch (error) {
    next(error);
  }
};