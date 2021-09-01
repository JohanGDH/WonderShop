const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {

    const auth = request.get('authorization');
    let token = '';

    if (auth && auth.toLowerCase().startsWith('bearer')) {
        token = auth.substring(7);
    }

    let decodedToken = '';
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_1);

    } catch (error) {
        return response.status(401).send({
            message: 'Tokén invalido o inexistente',
            error
        });

    }

    if (!token || !decodedToken.id) {
        return response.status(401).send({
            message: 'Tokén invalido o inexistente',
        });
    }

    next();
};
