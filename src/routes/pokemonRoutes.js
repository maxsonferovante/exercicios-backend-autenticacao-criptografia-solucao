const { Router } = require('express');

const { validarCadastroPokemon,
    validarAtualizacaoApelidoPokemon,
    validarBuscaPokemonPorId,
    validarDelecaoPokemon
} = require('../middlewares/pokemonsMiddlewares');

const { cadastrarPokemonController,
    atualizarApelidoDoPokemonController,
    buscarPokemonPorIdController,
    listarPokemonsController,
    deletarPokemonController
} = require('../controllers/pokemonController');

const verificarCredenciais = require('../middlewares/auth/authMiddlewares');


const routasPokemon = Router();

routasPokemon.post('/cadastro', verificarCredenciais, validarCadastroPokemon, cadastrarPokemonController);
routasPokemon.put('/atualizar/:id', verificarCredenciais, validarAtualizacaoApelidoPokemon, atualizarApelidoDoPokemonController);
routasPokemon.get('/buscar/:id', verificarCredenciais, validarBuscaPokemonPorId, buscarPokemonPorIdController);
routasPokemon.get('/buscar', verificarCredenciais, listarPokemonsController);
routasPokemon.delete('/deletar/:id', verificarCredenciais, validarDelecaoPokemon, deletarPokemonController);


module.exports = {
    routasPokemon
};