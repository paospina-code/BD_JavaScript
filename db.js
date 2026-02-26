const mysql = require ('mysql2');

const connection = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'mi_base_datos'

});

connection.connect(err => {
    if (err) {
        console.error('Error de conexión: ', err.message);
     } else {
        console.log('Conectado a MySQL correctamente'); 
     }
} );

module.exports = connection;