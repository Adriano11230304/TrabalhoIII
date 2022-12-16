const { DataTypes } = require('sequelize');
const sequelize = require('../persistencia/configDB');
const { Category } = require('./Category');
const { Tarefa } = require('./Tarefa');

const TarefaCategory = sequelize.define('TarefaCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    TarefaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Tarefa,
            key: 'id'
        }
    },
    CategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    modelName: 'TarefaCategory'
});

module.exports = { TarefaCategory };