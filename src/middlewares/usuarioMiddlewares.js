const { body, param } = require('express-validator');
const { validarCampos } = require('../middlewares/validationMiddleware');


const validarCadastroUsuario = [
    body('nome').notEmpty().withMessage('O campo nome é obrigatório'),
    body('email').notEmpty().withMessage('O campo email é obrigatório'),
    body('senha').notEmpty().withMessage('O campo senha é obrigatório'),
    validarCampos
];
const validarLoginUsuario = [
    body('email').notEmpty().withMessage('O campo email é obrigatório'),
    body('senha').notEmpty().withMessage('O campo senha é obrigatório'),
    validarCampos
];

const validarBuscaUsuarioPorEmail = [
    param('email').notEmpty().withMessage('O campo email é obrigatório'),
    validarCampos
];

const validarBuscaUsuarioPorId = [
    param('id').notEmpty().withMessage('O campo id é obrigatório'),
    validarCampos
];

module.exports = {
    validarCadastroUsuario,
    validarLoginUsuario,
    validarBuscaUsuarioPorEmail,
    validarBuscaUsuarioPorId
};