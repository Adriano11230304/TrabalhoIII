const { DataTypes } = require('sequelize');
const sequelize = require('../persistencia/configDB');

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: DataTypes.STRING
},{
    timestamps: false,
    modelName: 'categoria'
});

module.exports = { Categoria };