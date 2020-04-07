const express = require('express');
const app = express();
const router = require('./routes');

app.use(express.urlencoded({urlencoded: false}));

app.set('view engine', 'ejs');

app.use('/', router);




app.listen(3000, () => console.log('Servidor rodando na porta 3000...'))