const { User } = require('./User');
const { Tarefa } = require('./Tarefa');
const { Categoria } = require('./Categoria');

const sequelize = require('../persistencia/configDB');

console.log('Sync Models');

User.hasMany(Tarefa);
Tarefa.belongsTo(User);

Tarefa.belongsToMany(Categoria, { through: 'TarefaCategorias' });
Categoria.belongsToMany(Tarefa, { through: 'TarefaCategorias' });

User.belongsToMany(Categoria, { through: 'UserCategorias' });
Categoria.belongsToMany(User, { through: 'UserCategorias' });

sequelize.sync();