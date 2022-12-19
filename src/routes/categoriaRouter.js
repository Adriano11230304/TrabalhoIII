const express = require('express');
const categoriaRouter = express.Router();
const { CategoriaController } = require('../controllers/CategoriaController');
const categoriaController = new CategoriaController();
const { isAuth } = require('../middlewares/middleware')

categoriaRouter.get('/', isAuth, categoriaController.list);
categoriaRouter.post('/add', isAuth,categoriaController.add);
categoriaRouter.delete('/delete', isAuth, categoriaController.delete);
categoriaRouter.post('/compartilhar', isAuth, categoriaController.CompartilharCategoria);
categoriaRouter.get('/compartilhadas', isAuth, categoriaController.categoriasCompartilhadas);

module.exports = categoriaRouter;