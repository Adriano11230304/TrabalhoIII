const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/UserController');
const { isAuth } = require('../middlewares/middleware');
const userController = new UserController;

userRouter.get('/', isAuth, userController.list);
userRouter.post('/add', userController.add);
userRouter.delete('/remove', isAuth, userController.remove);
userRouter.post('/auth', userController.auth);

module.exports = userRouter;