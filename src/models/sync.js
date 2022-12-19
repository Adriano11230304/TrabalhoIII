const { User } = require('./User');
const { Tarefa } = require('./Tarefa');
const { Category } = require('./Category');
const { TarefaCategory } = require('./TarefaCategory');
const { CategoriaCompartilhada } = require('./CategoriaCompartilhada')

const sequelize = require('../persistencia/configDB');

console.log('Sync Models');

User.hasMany(Tarefa);
Tarefa.belongsTo(User);

Tarefa.belongsToMany(Category, { through: TarefaCategory });
Category.belongsToMany(Tarefa, { through: TarefaCategory });

User.hasMany(Category);
Category.belongsTo(User);

User.hasMany(CategoriaCompartilhada);
CategoriaCompartilhada.belongsTo(User);

Category.hasMany(CategoriaCompartilhada);
CategoriaCompartilhada.belongsTo(Category);

sequelize.sync();