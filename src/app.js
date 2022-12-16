const express = require('express');
const userRouter = require('./routes/userRoutes');
const tarefaRouter = require('./routes/tarefaRoutes');
const categoriaRouter = require('./routes/categoriaRouter');
const sync = require('./models/sync');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/tarefas', tarefaRouter);
app.use('/categorias', categoriaRouter);

app.get('/', (req, res) => {
    res.redirect('/users');
});


app.listen('3000', () => {
    console.log('Server is running!');
})