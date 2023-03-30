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

groupRouter.post('/image/name/userId', upload.single('image'), GroupController.createUserGroup);


groupRouter.patch('/:idGroup/image', upload.single('image'), GroupController.addImageGroup);


groupRouter.get('/users/:idUser', GroupController.getUserGroups);


module.exports = groupRouter;