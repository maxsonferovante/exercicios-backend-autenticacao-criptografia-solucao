const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../jwtSecret');
const { buscarUsuarioPorId } = require('../../database/dbUtils');



const verificarCredenciais = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ mensagem: 'Acesso não autorizado!' });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, jwtSecret);
        const usuarioExiste = await buscarUsuarioPorId(id);
        if (!usuarioExiste) {
            return res.status(404).json({ mensagem: 'Acesso não autorizado!' });
        }

        req.usuario = usuarioExiste;
        next();
    }
    catch (error) {
        return res.status(401).json({ mensagem: 'Acesso não autorizado!' });
    }
};

module.exports = verificarCredenciais;