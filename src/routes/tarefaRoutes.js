const express = require('express');
const tarefaRouter = express.Router();
const TarefaController = require('../controllers/TarefaController');
const tarefaController = new TarefaController();

tarefaRouter.post('/add', tarefaController.add);
tarefaRouter.delete('/remove', tarefaController.delete);
tarefaRouter.put('/update', tarefaController.update);
tarefaRouter.get('/', tarefaController.list);

module.exports = tarefaRouter;