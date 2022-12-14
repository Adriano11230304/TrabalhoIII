const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/UserController');
const { isAuth } = require('../middlewares/Auth');
const userController = new UserController;

userRouter.get('/', isAuth, userController.list);
userRouter.post('/add', userController.add);
userRouter.delete('/remove', userController.remove);
userRouter.post('/auth', userController.auth);

module.exports = userRouter;