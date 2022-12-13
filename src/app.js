const express = require('express');
const userRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');
const sync = require('./models/sync');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/todos', todoRouter);

app.get('/', (req, res) => {
    res.redirect('/users');
});


app.listen('3000', () => {
    console.log('Server is running!');
})