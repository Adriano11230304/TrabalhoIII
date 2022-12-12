const { User } = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { func } = require("joi");

class UserController{
    async list(req, res){
        let token = req.body.token;
        let validingToken = validyToken(token);
        if (validingToken.valid){
            const users = await User.findAll();
            res.status(200).json(users);
        }else{
            res.status(400).json(validingToken.msg);
        }
        
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

function validyToken(token){
    let res;
    jwt.verify(token, 'publicKey', function (err, decoded) {
        if (err) {
            res = {
                "msg": 'Token inválido',
                "valid": false
            };
        } else {
            res = {
                "token" : token,
                "valid": true,
                "msg": 'Token valido!',
                "user": decoded.user
            }   
        }
    });

    return res;
}

module.exports = UserController;