const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const controller = {

    login: async (req, res) => {
        const {body} = req;
        const { username, password } = body;

        const user = await User.findOne({username});
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);
        
        if(!(user && passwordCorrect)) {
            return res.status(401).send({
                message: 'Usuario o contraseña inválido '
            });
        }

        const infoForToken = {
            id: user._id,
            username: user.username,
        };

        const token = jwt.sign(infoForToken, process.env.SECRET_1, { expiresIn: '10h'});

        res.status(200).send({
            user: {
                username: user.username,
                name: user.name,
            },
            token,
        });
    }
};

module.exports = controller;