const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const Todo = sequelize.define('Todo', {
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
    modelName: 'todo'
});

module.exports = { Todo };