const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

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

/*const validyToken = (token) => {
    jwt.verify(token, 'publicKey', function (err, decoded) {
        if (err) {
            res.status(400).json("Token inválido!");
        } else {
            res.status(200).json({
                token,
                msg: 'Token valido!'
            })
        }
    });
}*/

module.exports = { User };