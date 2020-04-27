const mongoose = require('mongoose');

const processoSchema = new mongoose.Schema({
    numero: String,
    classe: String,
    reus: Array,
    faltaCitar: Array,
    obs: Array,
    urgencia: String
})

module.exports = mongoose.model('processos', processoSchema)