const { Tarefa } = require('../models/Tarefa');

class TarefaController{
    async list(req, res){
        const tarefas = await Tarefa.findAll();
        res.status(200).json(tarefas);
    }

    async add(req, res){
        const { title, description, dateConclusion } = req.body;
        await Tarefa.create({
            title: title,
            description: description,
            dateConclusion: dateConclusion,
            UserId: token.user.id
        })

        res.status(200).json('Tarefa adicionada com sucesso!');
    }

    async delete(req, res){
        const tarefa = await Tarefa.findOne({
            where:{
                id: req.body.id
            }
        })
        if(todo){
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
        const { title, description, dateConclusion } = req.body;
        await Tarefa.update({
            title: title,
            description: description,
            dateConclusion: dateConclusion
        },{
            where:{
                id: req.body.id
            }
        })

        res.status(200).json('Tarefa alterada com sucesso!');
    }
}

module.exports = TarefaController;