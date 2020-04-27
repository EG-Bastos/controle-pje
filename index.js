const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./router');
const path = require('path');
require('dotenv').config()

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('Conectado ao mongoDB.'));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', router)

app.listen(3030, () => console.log('Servidor rodando na porta 3030...'))