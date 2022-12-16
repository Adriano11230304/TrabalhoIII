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
    completionPrevision: DataTypes.DATE,
    dateConclusion: DataTypes.DATE,
    completed: DataTypes.BOOLEAN
}, {
    timestamps: true,
    modelName: 'tarefa'
});

module.exports = { Tarefa };