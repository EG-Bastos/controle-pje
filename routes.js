const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = require('./models/usuario');

mongoose.connect('mongodb+srv://*************@cluster0-lnmhz.mongodb.net/Forum?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('Banco de dados conectado com sucesso!'));

router.get('/formulario', (req, res) => {
    res.render('formulario');
});

router.post('/formulario',  async (req, res) => {
    let usuario = new Usuario({
        nome: req.body.nome,
        cargo: req.body.cargo,
        digitos: req.body.digitos
    });
    await usuario.save();
    res.redirect('/resultado');
});

router.get('/resultado', async (req, res) => {
    let resposta = await Usuario.find({});
    res.render('resultado', {resposta: resposta});
});

router.get('/editar/:id', async (req, res) => {
    let usuario = await (await Usuario.findById(req.params.id));
    res.render('editar', {usuario: usuario});
});

router.post('/editar/:id', async (req, res) => {
    await Usuario.updateOne({ _id: req.params.id}, {
        nome: req.body.nome,
        cargo: req.body.cargo,
        digitos: req.body.digitos
    });
    res.redirect('/resultado');
});

router.post('/deletar/:id', async (req, res) => {
    await Usuario.deleteOne({ _id: req.params.id});
    res. redirect('/resultado');
});

router.post('/confirmar/:id', (req, res) => {
    let id = req.params.id
    res.render('confirmar', {id: id})
});

module.exports = router;