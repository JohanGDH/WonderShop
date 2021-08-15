var app = require('./app');
var port = 4848;
var mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/wondershop',{useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => {
        console.log('Conexión con la base de datos establecida');

        app.listen(port, () => {
            console.log('Servidor establecido en ' + 'http://localhost:'+port+'/API');
        });
    })
    .catch((error) => {
        console.log('Ha ocurrido un error '+ error);
    });