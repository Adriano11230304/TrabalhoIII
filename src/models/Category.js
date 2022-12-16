const { DataTypes } = require('sequelize');
const sequelize = require('../persistencia/configDB');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: DataTypes.STRING
},{
    timestamps: false,
    modelName: 'category'
});

module.exports = { Category };