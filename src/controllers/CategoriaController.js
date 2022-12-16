const { Categoria } = require('../models/Categoria');

class CategoriaController{

    async list(req, res){
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    }

    async add(req, res){
        const { description } = req.body;
        await Categoria.create({
            description: description
        })

        res.status(200).json('Categoria criada com sucesso!');
    }

    async delete(req, res){
        const { id } = req.body;
        const categoria = await Categoria.findOne({
            where: {
                id: id
            }
        })

        if(categoria){
            await Categoria.destroy({
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