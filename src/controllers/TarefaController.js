const { Tarefa } = require('../models/Tarefa');
const { validyToken } = require('../models/User');

class TarefaController{
    async list(req, res){
        const token = validyToken(req.headers.token);
        if(token.valid){
            const tarefas = await Tarefa.findAll();
            res.status(200).json(tarefas);
        }else{
            res.status(400).json(token.msg);
        }
        
    }

    async add(req, res){
        const { title, description, dateConclusion } = req.body;
        const token = validyToken(req.headers.token);
        if(token.valid){
            await Tarefa.create({
                title: title,
                description: description,
                dateConclusion: dateConclusion,
                UserId: token.user.id
            })

            res.status(200).json('Tarefa adicionada com sucesso!');
        }else{
            res.status(400).json(token.msg);
        }
        
    }

    async delete(req, res){
        const token = validyToken(req.headers.token);
        if(!token.valid){
            res.status(400).json(token.msg);
        }
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
        const token = validyToken(req.headers.token);
        if(token.valid){
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
        }else{
            res.status(400).json('Token inválido!');
        }
    }
}

module.exports = TarefaController;