const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');


const controller = {

    login: async (req, res) => {
        const { body } = req;
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

        const token = jwt.sign(infoForToken, process.env.SECRET_1, { expiresIn: "5h"});

        res.status(200).send({
            user: {
                username: user.username,
                name: user.name,
                role: user.role,
            },
            token,
        });
    },

    recoveryPassword: () => {

    },

    sendRecoveryEmail: async (req, res) => {

		const { email } = req.body

		const user = await User.findOne({ username: email });

		if(!user) {
			return res.status(401).send({ message: 'Usurio no válido '});
		}

        const payload = { sub: user.username };
        const token = jwt.sign(payload, process.env.SECRET_1, {
          expiresIn: '30m',
        });

        User.findOneAndUpdate({username: email}, {recoveryToken: token}, {new: true}, (err, user) => {
            if(err || !user) return res.status(500).send({ message: "Error en el servidor" + err})
        })
            
        const link = `http://localhost:4200/recovery?token=${token}`        

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.SMTP_ACCOUNT,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: 'jgiandh46@gmail.com',
          to: user.username,
          subject: `Hello ${user.name}, este correo es para recuperar tu contraseña ✔`,
          html: `<b>Ingresa a este <a href="${link}">link</a> para recuperar tu contraseña</b>
          <br>
            Enviado el ${new Date()}
          `
        });
        return res.status(404).send({ message: `Email enviado a ${user.username}`})
    }
};

module.exports = controller;