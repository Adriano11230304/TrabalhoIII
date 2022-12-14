const { Tarefa } = require('../models/Tarefa');
const { TarefaCategory } = require('../models/TarefaCategory');
const { Op } = require("sequelize");
const { Category } = require('../models/Category');
const { validateTarefa } = require('../middlewares/validators')

class TarefaController{
    async list(req, res){
        const tarefas = await Tarefa.findAll({
            where:{
                UserId: req.headers.user.id
            }
        });
        res.status(200).json(tarefas);
    }

    async add(req, res){
        const { title, description, completionPrevision } = req.body;
        const { categoriaTarefa } = req.body;
        const user = req.headers.user;

        const validateTarefaJson = {
            title, description, completionPrevision
        };
        const errors = validateTarefa(validateTarefaJson);
        const msgs = [];
        if (errors) {
            errors.details.forEach(error => {
                msgs.push(error.message);
            })
            res.status(400).json(msgs);
        }

        const tarefa = await Tarefa.create({
            title: title,
            description: description,
            completionPrevision: completionPrevision,
            UserId: user.id,
            completed: false
        })
        
        if(categoriaTarefa){
            const categoria = await Category.findOne({
                where: {
                    id: categoriaTarefa
                }
            })
            if (categoriaTarefa && categoria.UserId == user.id) {
                await TarefaCategory.create({
                    CategoryId: categoriaTarefa,
                    TarefaId: tarefa.id
                })
            }
        }
        
        res.status(200).json('Tarefa adicionada com sucesso!');
    }

    async delete(req, res){
        await Tarefa.destroy({
            where: {
                id: req.body.id
            }
        });
        res.status(200).json('Tarefa excluída com sucesso!');
    }

    async update(req, res){
        const { title, description, completionPrevision } = req.body;
        await Tarefa.update({
            title: title,
            description: description,
            completionPrevision: completionPrevision
        },{
            where:{
                id: req.body.id
            }
        })

        res.status(200).json('Tarefa alterada com sucesso!');
    }

    async ckeckTarefa(req, res){
        const tarefa = await Tarefa.findOne({where:{id: req.body.id}})
        if(!tarefa.completed){
            await Tarefa.update({
                completed: true,
                dateConclusion: new Date()
            },{
                where: {
                    id: req.body.id
                }
            })
            res.status(200).json('Tarefa completa!');
        }else{
            res.status(400).json('Tarefa já está completa!');
        }
    }

    async tarefasPendentes(req, res){
        const user = req.headers.user;
        const tarefas = await Tarefa.findAll({
            where: {
                completed: false,
                userId: user.id
            }
        })

        res.status(200).json(tarefas);
    }

    async tarefasAtrasadas(req, res) {
        const user = req.headers.user;
        const date = new Date();
        const tarefas = await Tarefa.findAll({
            where: {
                completed: false,
                UserId: user.id,
                completionPrevision: {[Op.lt]: date}
            }
        })

        res.status(200).json(tarefas);
    }

    async vinculoCategoria(req, res){
        const user = req.headers.user;
        console.log('chegoy');
        if(!req.body.tarefaId || !req.body.categoryId){
            res.status(400).json("Tarefa ou categoria inexistente!")
        }
        const tarefa = await Tarefa.findOne({
            where: {
                id: req.body.tarefaId,
                UserId: user.id
            }
        })
        const categoria = await Category.findOne({
            where: {
                id: req.body.categoryId,
                UserId: user.id
            }
        })

        if(tarefa && categoria){
            await TarefaCategory.create({
                TarefaId: tarefa.id,
                CategoryId: categoria.id
            })
            res.status(200).json("Tarefa vinculada a categoria com sucesso!")
        }else{
            res.status(400).json("Tarefa ou categoria inexistente!")
        }
    }
}

module.exports = TarefaController;