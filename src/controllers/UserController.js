const { User } = require("../models/User");
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
        var token = '';
        const users = await User.findAll();
        for(let i = 0; i < users.length; i++){
            passwordCrypt = await bcrypt.compare(password, users[i].password);
            if(passwordCrypt && users[i].email == email){
                console.log('entrou');
                user = users[i];
                token = jwt.sign({ user: user }, 'publicKey', { expiresIn: '5min' });
            }
        }

        console.log('Token:', token);

        res.status(200).json(token);
    }

    verifyToken(req, res){
        let token = req.body.token;
        const validy = jwt.verify(token, 'publicKey', function (err, decoded) {
            if(err){
                res.status(400).json(err);
            }else{
                res.status(400).json(decoded.user);
            }
        });
        console.log(validy);
        res.status(200).json('OK');


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
            console.log(passwordCrypt);
            await User.create({
                email: email,
                password: passwordCrypt,
                nome: nome
            });
            res.status(200).json('Usuário adicionado com sucesso!');
        }
    }

    async remove(req, res){
        const users = await User.findAll();
        let userExist = false;
        users.forEach(user => {
            if(user.id == req.body.id){
                userExist = true;
            }
        })
        if(userExist){
            await User.destroy({
                where:{
                    id: req.body.id
                }
            });
            res.status(200).json('Usuário deletado com sucesso!');
        }else{
            res.status(400).json('Usário não existe!');
        }
    }
}

module.exports = UserController;