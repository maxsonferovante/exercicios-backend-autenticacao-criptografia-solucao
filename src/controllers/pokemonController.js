const {
    cadastrarPokemon,
    atualizarApelidoDoPokemon,
    buscarPokemonPorId,
    listarPokemons,
    deletarPokemon
} = require('../database/dbUtils');


const cadastrarPokemonController = async (req, res) => {

    const { nome, habilidades, imagem, apelido } = req.body;
    const usuario_id = req.usuario.id;
    const pokemonCadastrado = await cadastrarPokemon(nome, habilidades, imagem, apelido, usuario_id);
    if (pokemonCadastrado) {
        res.status(201).json(pokemonCadastrado);
    }
    else {
        res.status(404).json({ mensagem: 'Não foi possível cadastrar o pokemon' });
    }
};

const atualizarApelidoDoPokemonController = async (req, res) => {
    const { apelido } = req.body;
    const { id } = req.params;
    const pokemonAtualizado = await atualizarApelidoDoPokemon(id, apelido);
    if (pokemonAtualizado) {
        res.status(204).json(pokemonAtualizado);
    }
    else {
        res.status(404).json({ mensagem: 'Não foi possível atualizar o apelido do pokemon' });
    }
};

const buscarPokemonPorIdController = async (req, res) => {
    const { id } = req.params;
    const pokemon = await buscarPokemonPorId(id);
    if (pokemon) {
        res.status(200).json(pokemon);
    }
    else {
        res.status(404).json({ mensagem: 'Não foi possível encontrar o pokemon' });
    }

};

const listarPokemonsController = async (req, res) => {
    const pokemons = await listarPokemons();
    if (pokemons) {
        pokemons.map(pokemon => {
            pokemon.habilidades = pokemon.habilidades.split(',');
        });
        res.status(200).json(pokemons);
    }
    else {
        res.status(404).json({ mensagem: 'Não foi possível encontrar os pokemons' });
    }
};

const deletarPokemonController = async (req, res) => {
    const { id } = req.params;
    const pokemonDeletado = await deletarPokemon(id);
    if (pokemonDeletado) {
        res.status(204).send();
    }
    else {
        res.status(404).json({ mensagem: 'Não foi possível deletar o pokemon' });
    }
};

module.exports = {
    cadastrarPokemonController,
    atualizarApelidoDoPokemonController,
    buscarPokemonPorIdController,
    listarPokemonsController,
    deletarPokemonController
};