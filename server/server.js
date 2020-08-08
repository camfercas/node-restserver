require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/usuario', (req, res) => {
    res.json('get Usuario!');
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    if (body.nombre === undefined) {

        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });

    } else {

        res.json({
            usuario: body
        });

    }


});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;

    res.json({
        id
    });

});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario!');
});

app.listen(port, () => console.log(`Escuchando puerto: ${port}`));