const { User } = require('./User');
const { Tarefa } = require('./Tarefa');

const sequelize = require('../persistencia/configDB');

console.log('Sync Models');

User.hasMany(Tarefa);
Tarefa.belongsTo(User);

sequelize.sync();