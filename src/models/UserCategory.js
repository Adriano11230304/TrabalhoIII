const { DataTypes } = require('sequelize');
const sequelize = require('../persistencia/configDB');
const { Category } = require('./Category');
const { User } = require('./User');

const UserCategory = sequelize.define('UserCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
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
    modelName: 'UserCategory'
});

module.exports = { UserCategory };