const User = require('../models/user.model');

const roleValidator = {
        
    adminCheck: async (request, response, next) => {
        const { body } = request;
        const { ActiveUser } = body;    
        const user = await User.findOne({ username: ActiveUser });

        if(user.role != "Administrador" || !user.role) {
            return response.status(401).send({ message: 'No está autorizado' })
        }

        next();
    }
}

module.exports = roleValidator;