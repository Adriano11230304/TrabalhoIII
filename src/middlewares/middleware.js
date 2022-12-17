const jwt = require('jsonwebtoken');
const { Tarefa } = require('../models/Tarefa');
const isAuth = (req, res, next) => {
    jwt.verify(req.headers.token, 'publicKey', function (err, decoded){
        if (err) {
            res.status(400).json('Token inválido!');
        } else {
            req.headers.user = decoded.user;
            
            next();
        }
    });
};

const isAutor = async (req, res, next) => {
    const user = req.headers.user;
    const tarefa = await Tarefa.findOne({
        id: req.body.id,
        UserId: user.id
    })

    if(tarefa){
        next();
    }else{
        res.status(400).json("Tarefa inexistente ou você não é o Autor da tarefa!");
    }
}

module.exports = { isAuth };