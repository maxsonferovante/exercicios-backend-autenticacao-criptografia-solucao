const { Router } = require('express');

const {
    cadastrarUsuarioController,
    loginDoUsuarioController,
    buscarUsuarioPorIdController,
} = require('../controllers/usuarioController');

const { validarCadastroUsuario,
    validarLoginUsuario,
} = require('../middlewares/usuarioMiddlewares');

const verificarCredenciais = require('../middlewares/auth/authMiddlewares');


const routasUsuario = Router();


routasUsuario.post('/cadastro', validarCadastroUsuario, cadastrarUsuarioController);

routasUsuario.post('/login', validarLoginUsuario, loginDoUsuarioController);

routasUsuario.get('/buscar/:id', verificarCredenciais, buscarUsuarioPorIdController);


module.exports = {
    routasUsuario
};