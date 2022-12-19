const { DataTypes } = require("sequelize");
const sequelize = require('../persistencia/configDB');

const CategoriaCompartilhada = sequelize.define('CategoriaCompartilhada', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    timestamps: true,
    modelName: 'categoriaCompartilhada'
});

module.exports = { CategoriaCompartilhada };