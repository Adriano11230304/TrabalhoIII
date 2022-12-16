const express = require('express');
const categoriaRouter = express.Router();
const { CategoriaController } = require('../controllers/CategoriaController');
const categoriaController = new CategoriaController();

categoriaRouter.get('/', categoriaController.list);
categoriaRouter.post('/add', categoriaController.add);
categoriaRouter.delete('/delete', categoriaController.delete);

module.exports = categoriaRouter;