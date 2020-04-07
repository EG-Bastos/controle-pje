const mongoose = require('mongoose');

const colegaSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    digitos: {
        type: String,
        required: true
    }
});

const Usuario = mongoose.model('Colegas', colegaSchema);

module.exports = Usuario;