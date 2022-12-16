const { Category } = require('../models/Category');
const { Op } = require("sequelize");

class CategoriaController{

    async list(req, res){
        const user = req.headers.user;
        const categorias = await Category.findAll({
            where:{
                UserId: user.id
            }
        })
        
        
        res.status(200).json(categorias);
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