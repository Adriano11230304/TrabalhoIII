const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const Tarefa = sequelize.define('Tarefa', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    dateConclusion: DataTypes.DATE
}, {
    timestamps: true,
    modelName: 'tarefa'
});

module.exports = { Tarefa };