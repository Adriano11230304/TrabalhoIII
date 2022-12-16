const { Tarefa } = require('../models/Tarefa');

class TarefaController{
    async list(req, res){
        const tarefas = await Tarefa.findAll();
        res.status(200).json(tarefas);
    }

    async add(req, res){
        const { title, description, completionForecast } = req.body;
        await Tarefa.create({
            title: title,
            description: description,
            completionForecast: completionForecast,
            UserId: req.headers.user.id,
            completed: false
        })

        res.status(200).json('Tarefa adicionada com sucesso!');
    }

    async delete(req, res){
        const tarefa = await Tarefa.findOne({
            where:{
                id: req.body.id
            }
        })
        if(tarefa){
            await Tarefa.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json('Tarefa excluída com sucesso!');
        }else{
            res.status(400).json('Tarefa inexistente!');
        }
    }

    async update(req, res){
        const { title, description, completionForecast } = req.body;
        await Tarefa.update({
            title: title,
            description: description,
            completionForecast: completionForecast
        },{
            where:{
                id: req.body.id
            }
        })

        res.status(200).json('Tarefa alterada com sucesso!');
    }

    async ckeckTarefa(req, res){
        const tarefa = await Tarefa.findOne({
            where: {
                id: req.body.id
            }
        });

        if(tarefa){
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
        }else{
            res.status(400).json('Tarefa não existe!');
        }
    }
}

module.exports = TarefaController;