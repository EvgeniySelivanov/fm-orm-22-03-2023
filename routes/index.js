const { Router } = require('express');
const userRouter=require('./userRouter');
const taskRouter=require('./taskRouter');
const { checkUser } = require('./middlewares/user.mw');

const router=Router();
router.use('/users',userRouter);
router.use('/users/:idUser/tasks',checkUser,taskRouter);

module.exports=router;









