const {
    cadastrarUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
} = require('../database/dbUtils');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret = require('../jwtSecret');

const NumerosDeSaltos = 10;
const tempoDeExpiracaoEmHoras = 8

const cadastrarUsuarioController = async (req, res) => {
    const {
        nome, email, senha
    } = req.body;

    const UsuarioExiste = await buscarUsuarioPorEmail(email);
    if (UsuarioExiste) {
        return res.status(409).json({ mensagem: 'O usuário já está cadastrado!' });
    }
    const senhaCriptografada = await bcrypt.hash(senha, NumerosDeSaltos);
    const usuarioCadastrado = await cadastrarUsuario(nome, email, senhaCriptografada);
    if (usuarioCadastrado) {
        return res.status(201).json({
            mensagem: 'Usuario cadastrado com sucesso. Faça login para acessar a sua conta.'
        },
            dadosDoUsuario = {
                nome: usuarioCadastrado.nome,
                email: usuarioCadastrado.email,
                id: usuarioCadastrado.id
            }
        );
    }
    else {
        res.status(404).json({ mensagem: 'Não foi possível cadastrar o usuario' });
    }
};

const loginDoUsuarioController = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await buscarUsuarioPorEmail(email);
    if (usuario) {
        const senhaCorreta = await bcrypt.compare(senha, usuario.password);
        if (senhaCorreta) {
            const token = jwt.sign(
                { id: usuario.id },
                jwtSecret,
                { expiresIn: tempoDeExpiracaoEmHoras + 'h' }
            );
            return res.status(200).json({
                mensagem: 'Login realizado com sucesso',
                token: token,
                dadosDoUsuario: {
                    nome: usuario.nome,
                    email: usuario.email,
                    id: usuario.id
                }
            });
        }
        else {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }
    }
    else {
        return res.status(404).json({ mensagem: 'Não foi possível encontrar o usuario' });
    }

};

const buscarUsuarioPorEmailController = async (req, res) => {
    const { email } = req.params;
    const usuario = await buscarUsuarioPorEmail(email);
    if (usuario) {
        res.status(200).json(usuario);
    }
    else {
        res.status(404).json({ mensagem: 'Não foi possível encontrar o usuario' });
    }

};

const buscarUsuarioPorIdController = async (req, res) => {
    const { id } = req.params;
    const usuario = await buscarUsuarioPorId(id);
    if (usuario) {
        res.status(200).json(usuario);
    }
    else {
        res.status(404).json({ mensagem: 'Não foi possível encontrar o usuario' });
    }

};

module.exports = {
    cadastrarUsuarioController,
    loginDoUsuarioController,
    buscarUsuarioPorEmailController,
    buscarUsuarioPorIdController
};