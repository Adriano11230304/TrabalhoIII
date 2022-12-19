const express = require('express');
const tarefaRouter = express.Router();
const TarefaController = require('../controllers/TarefaController');
const { isAuth, isAutor } = require('../middlewares/middleware');
const tarefaController = new TarefaController();

tarefaRouter.post('/add', isAuth, tarefaController.add);
tarefaRouter.delete('/remove', isAuth, isAutor, tarefaController.delete);
tarefaRouter.put('/update', isAuth, isAutor,tarefaController.update);
tarefaRouter.put('/completed', isAuth, isAutor, tarefaController.ckeckTarefa);
tarefaRouter.get('/pendentes', isAuth, tarefaController.tarefasPendentes);
tarefaRouter.get('/atrasadas', isAuth, tarefaController.tarefasAtrasadas);
tarefaRouter.get('/', isAuth, tarefaController.list);
tarefaRouter.post('/vinculoCategory', isAuth, tarefaController.vinculoCategoria);

module.exports = tarefaRouter;