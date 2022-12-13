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

module.exports = { User };