const { pool } = require('./dbConfig');


const cadastrarUsuario = async (nome, email, password) => {
    const query = {
        text: `insert into usuarios(nome, email, password) values($1, $2, $3)`,
        values: [nome, email, password]
    };

    try {
        const usuario = await pool.query(query);
        return usuario.rows[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const buscarUsuarioPorEmail = async (email) => {
    const query = {
        text: `select * from usuarios where email = $1`,
        values: [email]
    };

    try {
        const usuario = await pool.query(query);
        return usuario.rows[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const buscarUsuarioPorId = async (id) => {
    const query = {
        text: `select * from usuarios where id = $1`,
        values: [id]
    };

    try {
        const usuario = await pool.query(query);
        return usuario.rows[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const cadastrarPokemon = async (nome, habilidades, imagem, apelido, usuario_id) => {
    const query = {
        text: `insert into pokemons(nome, habilidades, imagem, apelido, usuario_id) values($1, $2, $3, $4, $5)`,
        values: [nome, habilidades, imagem, apelido, usuario_id]
    };
    try {
        const pokemon = await pool.query(query);
        return pokemon.rows[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const atualizarApelidoDoPokemon = async (id, apelido) => {
    const query = {
        text: `update pokemons set apelido = $1 where id = $2`,
        values: [apelido, id]
    };
    try {
        const pokemon = await pool.query(query);
        return pokemon.rowCount > 0 ? { id, apelido } : null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const buscarPokemonPorId = async (id) => {
    const query = {
        text: `select * from pokemons where id = $1`,
        values: [id]
    };
    try {
        const pokemon = await pool.query(query);
        return pokemon.rows[0];
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const listarPokemons = async () => {
    const query = {
        text: `select p.id, u.nome as usuario, p.nome, p.apelido, p.habilidades, p.imagem from pokemons p
        left join usuarios u on p.usuario_id = u.id;`
    };
    try {
        const pokemons = await pool.query(query);
        return pokemons.rows;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

const deletarPokemon = async (id) => {
    const query = {
        text: `delete from pokemons where id = $1`,
        values: [id]
    };
    try {
        const pokemon = await pool.query(query);
        return pokemon.rowCount > 0 ? true : null;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};


module.exports = {
    cadastrarUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    cadastrarPokemon,
    atualizarApelidoDoPokemon,
    buscarPokemonPorId,
    listarPokemons,
    deletarPokemon
}