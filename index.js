const express = require('express');
require('dotenv').config()
const {dbConnection} = require('./database/config');
// Create the express app
const app = express();

//Base de datos
dbConnection()

//Directorio publico
app.use(express.static('public'))


//Lectura y parseo del body
app.use(express.json())

//Rutas
//TODO: auth // create, login, renew, logout
app.use('/api/auth', require('./routes/auth') )
app.use('/api/product', require('./routes/product') )





//Escuchar peticiones

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT} 😋`));