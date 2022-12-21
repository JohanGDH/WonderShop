const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');
const roleValidator = require('../middleware/roleValidator')

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

        if(user.role != "Administrador" && user.role != "Trabajador") {
          
            return res.status(401).send({
              message: 'No tiene acceso',
            });
        }

        const infoForToken = {
            id: user._id,
            username: user.username,
        };

        const token = jwt.sign(infoForToken, "estrellita", { expiresIn: "5h"});

        res.status(200).send({
            user: {
                username: user.username,
                name: user.name,
                role: user.role,
            },
            token,
        });
    },

    sendRecoveryEmail: async (req, res) => {

      const { email } = req.body

      const user = await User.findOne({ username: email });

      if(!user) {
        return res.status(401).send({ message: 'Usurio no válido '});
      }

      const payload = { sub: user.username };
      const token = jwt.sign(payload, "estrellita", {
        expiresIn: '30m',
      });

      User.findOneAndUpdate({username: email}, {recoveryToken: token}, {new: true}, (err, user) => {
          if(err || !user) return res.status(500).send({ message: "Error en el servidor" + err})
      })

      const link = `http://localhost:4200/recovery/${token}`

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'elizahersilla@gmail.com',
          pass: 'roqabhluwovqpppt',
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

      return res.status(202).send({ message: `Email enviado a ${user.username}`})
    },

    changePassword: async (req, res) => {

      const { newPassword, token } = req.body;

      const payload = jwt.verify(token, "estrellita");
      
      const user = await User.findOne({ username: payload.sub });

      console.log(payload, user);

      if(token !== user.recoveryToken) {
        return res.status(401).send({ message: "Unauthorized"})
      }

      const passwordHash = await bcrypt.hash(newPassword, 10);

      User.findOneAndUpdate({ username: user.username }, { recoveryToken: null, passwordHash }, { new: true }, (err, userUpdated)=> {
        if (err)
          return res.status(500).send({
            message: 'Error al actualizar los datos del usuario',
          });

        if (!userUpdated)
          return res.status(400).send({
            message: 'El usuario ha actualizar no existe',
          });

        return res.status(200).send({
          Usuario: userUpdated,
          Estado: 'Actualizado',
        });
      });

    }
};

module.exports = controller;