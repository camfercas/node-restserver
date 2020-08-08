require('./config/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

mongoose.connect(process.env.urlBD, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw new Error(err);

    console.log('Base de datos ONLINE');
});

mongoose.set('useCreateIndex', true);

app.listen(port, () => console.log(`Escuchando puerto: ${port}`));