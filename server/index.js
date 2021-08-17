require('dotenv').config();

var app = require('./app');
var port = process.env.PORT;
var mongoose = require('mongoose');
const connectionString = process.env.MONGO_DB_URI;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => {
        console.log('Conexión con la base de datos establecida');

        app.listen(port, () => {
            console.log('Servidor establecido en ' + 'http://localhost:'+port+'/API');
        });
    })
    .catch((error) => {
        console.log('Ha ocurrido un error '+ error);
    });