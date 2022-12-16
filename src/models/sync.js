const { User } = require('./User');
const { Tarefa } = require('./Tarefa');
const { Category } = require('./Category');
const { UserCategory } = require('./UserCategory');
const { TarefaCategory } = require('./TarefaCategory');

const sequelize = require('../persistencia/configDB');

console.log('Sync Models');

User.hasMany(Tarefa);
Tarefa.belongsTo(User);

Tarefa.belongsToMany(Category, { through: TarefaCategory });
Category.belongsToMany(Tarefa, { through: TarefaCategory });

User.belongsToMany(Category, { through: UserCategory });
Category.belongsToMany(User, { through: UserCategory });

sequelize.sync();