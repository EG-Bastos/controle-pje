const mongoose = require('mongoose');

const processoSchema = new mongoose.Schema({
    numero: String,
    classe: String,
    reus: Array,
    todosCitados: String,
    faltaCitar: Array,
    obs: Array
})

module.exports = mongoose.model('processos', processoSchema)