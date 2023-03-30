const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const GroupController = require('../controllers/group.controller');

// const upload = multer({
//   dest:path.resolve(__dirname,'../public/images'), 
// });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/images'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '_' + file.originalname)
  }
})

const upload = multer({ storage })

const groupRouter = Router();

groupRouter.post('/', GroupController.createUserGroup);

//PATCH http://localhost:3000/api/groups/2/image HTTP1/1
groupRouter.patch('/:idGroup/image', upload.single('image'), GroupController.addImageGroup);


groupRouter.get('/users/:idUser', GroupController.getUserGroups);


module.exports = groupRouter;