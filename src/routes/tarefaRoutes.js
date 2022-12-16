const express = require('express');
const tarefaRouter = express.Router();
const TarefaController = require('../controllers/TarefaController');
const { isAuth } = require('../middlewares/Auth');
const tarefaController = new TarefaController();

tarefaRouter.post('/add', isAuth, tarefaController.add);
tarefaRouter.delete('/remove', isAuth, tarefaController.delete);
tarefaRouter.put('/update', isAuth, tarefaController.update);
tarefaRouter.put('/completed', isAuth, tarefaController.ckeckTarefa);
tarefaRouter.get('/', isAuth, tarefaController.list);

module.exports = tarefaRouter;