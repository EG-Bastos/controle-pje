const express = require('express')
const router = express.Router()
const Processo = require('./models/Processo')
const mongoose = require('mongoose')


router.get('/novoprocesso', (req, res) => {
    res.render('novoprocesso')
})

router.post('/novoprocesso', async (req, res) => {
    const processo = new Processo({
        numero: req.body.numero,
        classe: req.body.classe,
        urgencia: 'NÃO',
        reus: [],
        faltaCitar: []
    })
    await processo.save()
    res.redirect(`/processo/${processo._id}`)
})

router.get('/processos', async (req, res) => {
    const processos = await Processo.find()
    res.render('processos', {processos: processos})
})

router.get('/processo/:id', async (req, res) => {
    const processo = await Processo.findById(req.params.id)
    res.render('processo', {processo: processo})
})

router.post('/novoreu/:id', async (req, res) => {
    const processo = await Processo.findById(req.params.id)
    await Processo.updateOne(
        {_id: req.params.id},
        {$push: {reus: {
            nome: req.body.reu,
            citado: 'NÃO',
            obs: []
        }}}
    )
    await Processo.updateOne(
        {_id: req.params.id},
        {$push: {faltaCitar: req.body.reu}}
    )
    res.redirect(`/processo/${processo._id}`)
})

router.post('/citacao/:id/:nome', async (req, res) => {
    const processo = await Processo.findById(req.params.id)
    await Processo.updateOne({_id: req.params.id, 'reus.nome': req.params.nome}, {$set: {'reus.$.citado': 'SIM'}})
    await Processo.updateOne({_id: req.params.id}, {$pull: {faltaCitar: req.params.nome}})
    res.redirect(`/processo/${req.params.id}`)
})

router.post('/cancelacitacao/:id/:nome', async (req, res) => {
    const processo = await Processo.findById(req.params.id)
    const indice = processo.reus.findIndex(x => x.nome === req.params.nome)
    if (processo.reus[indice].citado === 'SIM') {
        await Processo.updateOne({_id: req.params.id}, {$push: {faltaCitar: req.params.nome}})
    }
    await Processo.updateOne({_id: req.params.id, 'reus.nome': req.params.nome}, {$set: {'reus.$.citado': 'NÃO'}})
    res.redirect(`/processo/${processo._id}`)
})

router.post('/excluireu/:id/:nome', async (req, res) => {
    await Processo.updateOne({_id: req.params.id}, {$pull: {reus: {nome: req.params.nome}}})
    await Processo.updateOne({_id: req.params.id}, {$pull: {faltaCitar: req.params.nome}})
    console.log(req.params)
    res.redirect(`/processo/${req.params.id}`)
})

router.post('/obs/:id', async (req, res) => {
    const id = req.params.id
    console.log(req.params)
    await Processo.updateOne({_id: id}, {$push: {obs: {
        obsid: Date.now().toString(),
        nota: req.body.nota
    }}})
    res.redirect(`/processo/${id}`)
})

router.post('/excluinota/:id/:obsid', async (req, res) => {
    await Processo.updateOne({_id: req.params.id}, {$pull: {obs: {obsid: req.params.obsid}}})
    res.redirect(`/processo/${req.params.id}`)
})

router.post('/urg/:id', async (req, res) => {
    const processo = await Processo.findById(req.params.id)
    const urgencia = processo.urgencia
    if (urgencia === 'NÃO') {
        await Processo.updateOne({_id: req.params.id}, {$set: {urgencia: 'SIM'}})
    } else if (urgencia === 'SIM') {
        await Processo.updateOne({_id: req.params.id}, {$set: {urgencia: 'NÃO'}})
    }
    res.redirect(`/processo/${req.params.id}`)
})

router.get('/urgentes', async (req, res) => {
    const urgentes = await Processo.find({urgencia: "SIM"})
    res.render('urgentes', {urgentes: urgentes})
})

module.exports = router

