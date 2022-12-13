const { Todo } = require('../models/Todo');
const { validyToken } = require('../models/User');

class TodoController{
    async list(req, res){
        const token = validyToken(req.body.token);
        if(token.valid){
            const todos = await Todo.findAll();
            res.status(200).json(todos);
        }else{
            res.status(400).json(token.msg);
        }
        
    }

    async add(req, res){
        const { title, description, dateConclusion } = req.body;
        const token = validyToken(req.body.token);
        if(token.valid){
            await Todo.create({
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
        const token = validyToken(req.body.token);
        if(!token.valid){
            res.status(400).json(token.msg);
        }
        const todo = await Todo.findOne({
            where:{
                id: req.body.id
            }
        })
        if(todo){
            await Todo.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json('Tarefa excluída com sucesso!');
        }else{
            res.status(400).json('Tarefa inexistente!');
        }

        
    }
}

module.exports = TodoController;