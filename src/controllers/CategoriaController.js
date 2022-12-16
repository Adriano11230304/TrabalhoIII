const { Category } = require('../models/Category');
const { UserCategory } = require('../models/UserCategory');

class CategoriaController{

    async list(req, res){
        const user = req.headers.user;
        const UserCategorys = await UserCategory.findAll({
            where:{
                UserId: user.id
            }
        })
        const categorias = [];
        let categoria;
        for(let i = 0; i < UserCategorys.length; i++){
            categoria = await Category.findOne({
                where: {
                    id: UserCategorys[i].CategoryId
                }
            })
            categorias.push(categoria)
        }        
        
        res.status(200).json(categorias);
    }

    async add(req, res){
        const { description } = req.body;
        const user = req.headers.user
        const category = await Category.create({
            description: description
        })
        
        await UserCategory.create({
            UserId: user.id,
            CategoryId: category.id
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