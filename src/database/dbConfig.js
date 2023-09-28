const { Pool } = require('pg');

const pool = new Pool({
    user: 'cubosacademy',
    password: 'cubosacademy',
    host: 'localhost',
    port: 5432,
    database: 'catalogo_pokemons'
});
const createTablesIfNotExists = async () => {
    const createTableUsers = `create table if not exists usuarios (
        id serial primary key not null,
        nome varchar(200) not null,
        email varchar(100) not null unique,
        password varchar(100) not null
    );
    `;
    const createTablePokemons = `create table if not exists pokemons (
        id serial primary key not null,
        nome varchar(200) not null,
        habilidades varchar(200) not null,
        imagem varchar(200),
        apelido varchar(200),
        usuario_id integer not null references usuarios(id)
    );
    `;

    try {

        await pool.query(createTableUsers);
        await pool.query(createTablePokemons);
    }
    catch (error) {
        console.log(error);
    }
};


module.exports = {
    pool,
    createTablesIfNotExists
};