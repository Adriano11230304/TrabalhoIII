const { User } = require('./User');
const { Todo } = require('./Todo');

const sequelize = require('../persistencia/configDB');

console.log('Sync Models');

User.hasMany(Todo);
Todo.belongsTo(User);

sequelize.sync();