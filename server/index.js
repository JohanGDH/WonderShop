require('dotenv').config();

var app = require('./app');
var port = 6969;
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
var mongoose = require('mongoose');
const connectionString = NODE_ENV == 'test'
    ? MONGO_DB_URI_TEST
    :MONGO_DB_URI;

mongoose.set('useFindAndModify', false);
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true,'useCreateIndex': true})
    .then(() => {
        console.log('Conexión con la base de datos establecida');        
    })
    .catch((error) => {
        console.log('Ha ocurrido un error '+ error);
    });
const server = app.listen(port, () => {
    console.log('Servidor establecido en ' + 'http://localhost:' + port + '/API');
});
    
process.on('uncaughtException', (error) => {
    console.error(error);
    mongoose.disconnect();
});

module.exports = {app, server} ;