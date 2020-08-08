// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = 'mongodb+srv://camfercas:hrNUBkhGeY0x9equ@cluster0.2tbf1.mongodb.net/cafe';
}

process.env.urlBD = urlBD;