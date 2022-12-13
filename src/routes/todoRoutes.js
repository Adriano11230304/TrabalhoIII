const express = require('express');
const todoRouter = express.Router();
const TodoController = require('../controllers/TodoController');
const todoController = new TodoController();

todoRouter.post('/add', todoController.add);
todoRouter.delete('/remove', todoController.delete);
todoRouter.get('/', todoController.list);

module.exports = todoRouter;