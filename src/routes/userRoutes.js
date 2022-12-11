const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/UserController');
const userController = new UserController;

userRouter.get('/', userController.list);
userRouter.post('/add', userController.add);
userRouter.delete('/remove', userController.remove);
userRouter.post('/auth', userController.auth);
userRouter.post('/token', userController.verifyToken);

module.exports = userRouter;