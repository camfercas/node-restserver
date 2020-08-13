const express = require('express');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

// Mostrar todas las categorias
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categoriaBD) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias: categoriaBD
            });

        });

});

// Mostrar una categoria por Id
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaIdBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaIdBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe la categoria con el id ${id}`
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaIdBD
        });
    });

});

// Crear una categoria
app.post('/categoria', verificaToken, (req, res) => {
    //regresa nueva categoria
    //req.usuario._id

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

// Actualiar una categoria por Id
app.put('/categoria/:id', verificaToken, (req, res) => {
    // Actualiza categoria descripcion

    let id = req.params.id;
    let descripcion = req.body;

    Categoria.findOneAndUpdate(id, descripcion, { new: true, runValidators: true, context: 'query' }, (err, categoriaIdBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaIdBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe la categoria con el id ${id}`
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaIdBD
        });
    });

});

// Borrar una categoria por Id
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res) => {
    // solo admin borrar
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `No existe la categoria con el id ${id}`
                }
            });
        }

        res.json({
            ok: true,
            message: `Categoria con el id ${id} borrada correctamente`
        });
    })
});

module.exports = app;