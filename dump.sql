create database if not exists catalogo_pokomons;

create table if not exist usuarios(
    id serial primary key not null,
    nome varchar(200) not null,
    email varchar(100) not null unique,
    password varchar(100) not null,
);

create table if not exist pokemons(
    id serial primary key not null,
    nome varchar(200) not null,
    habilidades varchar(200) not null,
    imagem varchar(200),
    apelido varchar(200),
    usuario_id integer not null references usuarios(id)
);
