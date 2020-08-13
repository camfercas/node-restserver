const express = require('express');
const app = express();

const Producto = require('../models/producto');

const { verificaToken } = require('../middlewares/autenticacion');

// Obtener productos
app.get('/productos', verificaToken, (req, res) => {
    // Trae todos los productos
    // populate: ususario categoria
    // paginaod

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('usuario')
        .populate('categoria')
        .exec((err, productoDB) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });

        });
});

// Obtener un producto por ID
app.get('/productos/:id', verificaToken, (req, res) => {

    // populate: ususario categoria

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario')
        .populate('categoria')
        .exec((err, productoBD) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoBD) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `El producto ${ id } no se encontro.`
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoBD
            });
        });

});

// Buscar productos
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });

        });

});

// Crear un nuevo produto
app.post('/productos', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una caregoria del listado

    let producto = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        disponible: true,
        categoria: req.body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});

// Actualizar un producto
app.put('/productos/:id', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar una caregoria del listado

    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `El producto ${ id } no se encontro.`
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });
});

// Actualizar un producto
app.delete('/productos/:id', verificaToken, (req, res) => {
    // disponible a falso
    // el producto ha sido deshabilitado

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `El producto ${ id } no se encontro.`
                }
            });
        }

        res.json({
            ok: true,
            producto: 'El producto ha sido deshabilitado'
        });

    });

});

module.exports = app;