// declaracion de variables de librerias e iniciacion de express
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import validaciones from './validaciones.js';

const app = express();
const staticToken = 'token-de-prueba';


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

//configuracion de la conexion a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'postjam19751011admin2023',
    database: 'TEST'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Middleware para verificar el token estático
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token === staticToken) {
        next();
    } else {
        res.status(403).send('Acceso denegado');
    }
};

//endpoint para obtener todos los colaboradores
app.get('/colaborador', verificarToken, (req, res) => {
    db.query('SELECT * FROM COLABORADOR', (err, result) => {
        if (err) {
            res.status(500, err);
        } else {
            res.status(200).send(result);
        }
          });
});

//endpoint para obtener un colaborador por id
app.get('/colaborador/:id',verificarToken, (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM COLABORADOR WHERE IDCOLABORADOR = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

//endpoint para guardar un colaborador
app.post('/colaborador',verificarToken, (req, res) => {
    const colaborador = req.body.colaborador;

    //validacion de los datos
    const listaValidaciones = validaciones(colaborador);

    if(listaValidaciones.length > 0) {
        //retorno de lista de validaciones a frontend
        res.status(400).send(listaValidaciones);
        return;
    } else {
        //guardar colaborador en la base de datos
        db.query('INSERT INTO COLABORADOR SET ?', colaborador, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });
    }
});

//endpoint para eliminar un colaborador
app.delete('/colaborador/:id',verificarToken, (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM COLABORADOR WHERE IDCOLABORADOR = ?', id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

//endpoint para actualizar un colaborador
app.put('/colaborador/:id',verificarToken, (req, res) => {
    const id = req.params.id;
    const colaborador = req.body.colaborador;

    //validacion de los datos
    const listaValidaciones = validaciones(colaborador);

    if(listaValidaciones.length > 0) {
        //retorno de lista de validaciones a frontend
        res.status(400).send(listaValidaciones);
        return;
    } else {
        //actualizar colaborador en la base de datos
        db.query('UPDATE COLABORADOR SET ? WHERE IDCOLABORADOR = ?', [colaborador, id], (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(result);
            }
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});