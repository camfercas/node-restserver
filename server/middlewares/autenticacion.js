const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();

    });

};


let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    console.log(usuario);

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: {
                message: 'Usuario no es administrador'
            }
        });
    }

    next();

};

module.exports = {
    verificaToken,
    verificaAdminRole
};