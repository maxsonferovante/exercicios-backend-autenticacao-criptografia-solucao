const { body, param } = require('express-validator');
const { validarCampos } = require('../middlewares/validationMiddleware');

const validarCadastroPokemon = [
    body('nome').notEmpty().withMessage('O campo nome é obrigatório'),
    body('habilidades').notEmpty().withMessage('O campo habilidades é obrigatório'),

    validarCampos
];

const validarAtualizacaoApelidoPokemon = [
    body('apelido').notEmpty().withMessage('O campo apelido é obrigatório'),
    param('id').notEmpty().withMessage('O campo id é obrigatório'),
    validarCampos
];

const validarBuscaPokemonPorId = [
    param('id').notEmpty().withMessage('O campo id é obrigatório'),
    validarCampos
];

const validarDelecaoPokemon = [
    param('id').notEmpty().withMessage('O campo id é obrigatório'),
    validarCampos
];

module.exports = {
    validarCadastroPokemon,
    validarAtualizacaoApelidoPokemon,
    validarBuscaPokemonPorId,
    validarDelecaoPokemon
};