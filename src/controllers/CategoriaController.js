const { Category } = require('../models/Category');
const { TarefaCategory } = require('../models/TarefaCategory');
const { Op } = require("sequelize");
const { Tarefa } = require('../models/Tarefa');
const { CategoriaCompartilhada } = require('../models/CategoriaCompartilhada');
const { User } = require('../models/User');

class CategoriaController{

    async list(req, res){
        const user = req.headers.user;
        const categorias = await Category.findAll({
            where:{
                UserId: user.id
            }
        })
        let tarefaCategoria;
        let tarefa;
        let categoriasJson;
        let tarefasCategorias = [];
        const categoriasJsonFinal = [];
        for(let i = 0; i < categorias.length; i++){
            tarefaCategoria = await TarefaCategory.findAll({
                where: {
                    CategoryId: categorias[i].id
                }
            })
            
            for(let j = 0; j < tarefaCategoria.length; j++){
                tarefa = await Tarefa.findOne({
                    where: {
                        id: tarefaCategoria[j].TarefaId,
                        UserId: user.id
                    }
                })
                let tarefaJson = {
                    "id": tarefa.id,
                    "title": tarefa.title,
                    "description": tarefa.description,
                    "completionPrevision": tarefa.completionPrevision,
                    "dateConclusion": tarefa.dateConclusion,
                    "completed": tarefa.completed,
                    "createdAt": tarefa.createdAt,
                    "updatedAt": tarefa.updatedAt,
                    "UserId": tarefa.UserId
                }
                tarefasCategorias.push(tarefaJson);
            }

            categoriasJson = {
                "id": categorias[i].id,
                "description": categorias[i].description,
                "UserId": categorias[i].UserId,
                "tarefas": tarefasCategorias
            }

            tarefasCategorias = [];
            categoriasJsonFinal.push(categoriasJson);
            
        }
        
        res.status(200).json(categoriasJsonFinal);
    }

    async add(req, res){
        const { description } = req.body;
        const user = req.headers.user;
        await Category.create({
            description: description,
            UserId: user.id
        })

        res.status(200).json('Categoria criada com sucesso!');
    }

    async delete(req, res){
        const { id } = req.body;
        const categoria = await Category.findOne({
            where: {
                id: id
            }
        })

        if(categoria){
            await Category.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json('Categoria excluida com sucesso!');
        }else{
            res.status(400).json('Categoria não existe!');
        }
    }

    async CompartilharCategoria(req, res){
        const user = req.headers.user;
        const { categoryId, email } = req.body;
        if(!categoryId || !email){
            res.status(400).json('Dados inválidos!');
        }
        const categoria = await Category.findOne({
            where: {
                id: categoryId,
                UserId: user.id
            }
        })
        const userCompartilhado = await User.findOne({
            where:{
                email: email
            }
        })
        if (!userCompartilhado || !categoria || userCompartilhado.id == user.id){
            res.status(400).json('Dados inválidos!');
        }
        console.log(categoria.id);

        await CategoriaCompartilhada.create({
            UserId: userCompartilhado.id,
            CategoryId: categoria.id
        })

        res.status(200).json('Categoria Compartilhada com sucesso!');
    }

    async categoriasCompartilhadas(req, res){
        const categoriasCompartilhadas = await CategoriaCompartilhada.findAll({
            where: {
                UserId: req.headers.user.id
            }
        })
        let tarefaCategory;
        const tarefas = [];
        let categoria;
        let tarefa;
        let categoriasJson = [];
        for(let i = 0; i < categoriasCompartilhadas.length; i++){
            tarefaCategory = await TarefaCategory.findAll({
                where: {
                    CategoryId: categoriasCompartilhadas[i].CategoryId
                }
            })
            categoria = await Category.findOne({
                where: {
                    id: categoriasCompartilhadas[i].CategoryId
                }
            })
            for(let j = 0; j < tarefaCategory.length; j++){
                tarefa = await Tarefa.findOne({
                    id: tarefaCategory.TarefaId
                })
                tarefa = {
                    "id": tarefa.id,
                    "title": tarefa.title,
                    "description": tarefa.description,
                    "completionPrevision": tarefa.completionPrevision,
                    "dateConclusion": tarefa.dateConclusion,
                    "completed": tarefa.completed,
                    "createdAt": tarefa.createdAt,
                    "updatedAt": tarefa.updatedAt,
                    "UserId": tarefa.UserId
                }
                tarefas.push(tarefa);
            }

            categoria = {
                "id": categoria.id,
                "description": categoria.description,
                "UserId": categoria.UserId,
                "tarefas": tarefas
            }

            categoriasJson.push(categoria);
        }

        console.log("categorias:", categoriasJson);
        console.log("Tarefas:", tarefas);

        res.json(categoriasJson);
    }

}

module.exports = { CategoriaController };