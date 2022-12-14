const { User, validyToken } = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController{
    async list(req, res){
        const users = await User.findAll();
        res.status(200).json(users);
    }

    async auth(req, res){
        const { email, password } = req.body;
        let passwordCrypt;
        let user;
        let userExist = false;
        var token = '';
        const users = await User.findAll();
        for(let i = 0; i < users.length; i++){
            passwordCrypt = await bcrypt.compare(password, users[i].password);
            if(passwordCrypt && users[i].email == email){
                user = users[i];
                token = jwt.sign({ user: user }, 'publicKey', { expiresIn: '5min' });
                userExist = true;
            }
        }

        let msg = userExist ? 'Usuário autenticado!' : 'Usuário não existente!';

        res.status(200).json({token, msg});
    }

    async add(req, res){
        const {email, nome, password } = req.body;
        const users = await User.findAll();
        let userExist = false;
        for(let i = 0; i < users.length; i++){
            if(email == users[i].email || nome == users[i].nome){
                userExist = true;
                res.status(400).json('Email ou nome já cadastrado!');
            }
        }
        if(!userExist){
            const passwordCrypt = await bcrypt.hash(password, 10);
            await User.create({
                email: email,
                password: passwordCrypt,
                nome: nome
            });
            res.status(200).json('Usuário adicionado com sucesso!');
        }
    }

    async remove(req, res){
        let user;
        user = await User.findOne({
            where: {
                id: req.body.id
            }
        });
        if (user) {
            await User.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).json('Usuário deletado com sucesso!');
        } else {
            res.status(400).json('Usuário não existe!');
        }
        
    }
}

module.exports = UserController;