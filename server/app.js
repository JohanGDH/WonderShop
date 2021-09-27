const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./API/routes/productRoutes');
const userRouter = require('./API/routes/userRouter');
const loginRouter = require('./API/routes/loginRouter');
const cloudinary = require('cloudinary');

const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(
    cors()
);

app.use('/API', productRouter);
app.use('/API/users', userRouter);
app.use('/API/login', loginRouter);

module.exports = app;
