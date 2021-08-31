

const User = require("../models/user.model");
const bcrypt = require('bcrypt');

const controller = {
    test: (req, res) => res.status(200).send({
        message: "Metodo Test",
    }),

    listUser: (req, res) => {
        User.find({})
            .populate('products',{
                name: 1,
                price: 1,
                stock: 1,
            })
            .exec((err, users) => {
                if (err)
                    return res.status(500).send({
                        message: 'Error al listar los productos',
                    });

                if (!users)
                    return res.status(404).send({
                        message: 'No hay productos que listar',
                    });

                return res.status(200).send({ users });
            });
    },

    getUser: (req, res) => {
        const UserId = req.params.id;

        if (UserId == null) {
            return res.status(404).send({
                message: "El nombre especificado no es válido",
            });
        }

        User.findById(UserId, (err, user) => {
            if (err)
                return res.status(500).send({
                    message: 'Error al devolver el usuario',
                    err
                });

            if (user.length < 1)
                return res.status(404).send({
                    message: 'Producto no encontrado',
                });

            return res.status(200).send({
                user,
            });
        }).populate('products', {
            name: 1,
            price: 1,
            stock: 1,          
        });
    },

    saveUser: async (req, res) => {
        const user = new User();
        const params = req.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(params.password, saltRounds);     

        user.username = params.username;
        user.name = params.name;
        user.passwordHash = passwordHash;
        user.products = params.products;

        user.save((error, userStored) => {
            if (error)
                return res.status(500).send({
                    message: "Error al guardar el usuario",
                    error,
                });

            if (!userStored)
                return res.status(400).send({
                    message: "No se envió ningún usuario para guardar",
                    error,
                });

            return res.status(201).send({
                usuario: userStored,
                Estado: "Guardado",
            });
        });
    },

    updateUser: async (req, res)  => {
        const UserId = req.params.id;
        const {body} = req;
        const update = {};
        const passwordHash = await bcrypt.hash(body.password, 10);  

        if (body.username) update.username = body.username;
        if (body.name) update.name = body.name;
        if (body.password) update.passwordHash = passwordHash;

        User.findByIdAndUpdate(UserId, update, { new: true }, (err, productUpdated) => {
                
            if (err)
                return res.status(500).send({
                    message: 'Error al actualizar los datos del usuario',
                });

            if (!productUpdated)
                return res.status(400).send({
                    message: 'El usuario ha actualizar no existe',
                });

            return res.status(200).send({
                Usuario: productUpdated,
                Estado: 'Actualizado',
            });
        });
    },

    deleteUser: (req, res) => {
        const UserId = req.params.id;
        User.findByIdAndDelete( UserId, (err, userDeleted) => {
            if (err)
                return res.status(500).send({
                    message: 'Ha ocurrido un error al borrar el usuario',
                });

            if (!userDeleted)
                return res.status(400).send({
                    message: 'No se puede borrar usuario, ya que este no existe',
                });

            return res.status(200).send({
                usuario: userDeleted,
                Estado: 'Eliminado',
            });
        });
    },
};

module.exports = controller;
