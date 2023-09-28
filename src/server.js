const express = require('express');

const { routasPokemon, routasUsuario } = require('./routes/routes')

const { createTablesIfNotExists } = require('./database/dbConfig')

const app = express();


app.use(express.json());
createTablesIfNotExists();
app.use('/usuario', routasUsuario);
app.use('/pokemon', routasPokemon);


port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

