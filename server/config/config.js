// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Vencimiento del Token

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// SEED de autenticación

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


// Base de datos

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URI;
}

process.env.urlBD = urlBD;

// Google Client ID

process.env.CLIENT_ID = process.env.CLIENT_ID || "1097410094535-angqc6ean2sshtpc4cinuqfh710qttv0.apps.googleusercontent.com";