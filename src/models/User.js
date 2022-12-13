const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    nome: DataTypes.STRING
}, {
    timestamps: true,
    modelName: 'users'
});

function validyToken(token) {
    let res;
    jwt.verify(token, 'publicKey', function (err, decoded) {
        if (err) {
            res = {
                "msg": 'Token inválido!',
                "valid": false
            };
        } else {
            res = {
                "token": token,
                "valid": true,
                "msg": 'Token valido!',
                "user": decoded.user
            }
        }
    });

    return res;
}

module.exports = { User, validyToken };