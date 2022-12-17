const { Category } = require('../models/Category');
const { TarefaCategory } = require('../models/TarefaCategory');
const { Op } = require("sequelize");
const { Tarefa } = require('../models/Tarefa');

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
                        id: tarefaCategoria[j].TarefaId
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

}

module.exports = { CategoriaController };