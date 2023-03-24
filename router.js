const { Router } = require('express');
const UserController = require('./controllers/user.controller');
const router = Router();

//method & controllers
//http://localhost:3000/api/test
//router.get('/test', ()=>{})

//users
//http://localhost:3000/api
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);


module.exports = router;
