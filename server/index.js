var app = require('./app')
var port = 4848;

app.listen(port, () => {
    console.log("Servidor establecido en " + 'http://localhost:'+port+'/API')
})