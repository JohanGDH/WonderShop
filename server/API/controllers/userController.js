"use strict";

const User = require("../models/user.model");
const bcrypt = require('bcrypt');

const controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: "Metodo Test",
        });
    },

    listUser: (req, res) => {
        User.find({})
            .exec((err, users) => {
                if (err) return res.status(500).send({
                    message: "Error al listar los productos",
                });

                if (!users)
                    return res.status(404).send({
                        message: "No hay productos que listar",
                    });

                return res.status(200).send({ users });
            });
    },

    // getProduct: (req, res) => {
    //     let productName = req.params.name;

    //     if (productName == null) {
    //         return res.status(404).send({
    //             message: "El nombre especificado no es válido",
    //         });
    //     }

    //     Product.find({ name: productName }, (err, product) => {
    //         if (err)
    //             return res.status(500).send({
    //                 message: "Error al devolver el producto",
    //             });

    //         if (product.length < 1)
    //             return res.status(404).send({
    //                 message: "Producto no encontrado",
    //             });

    //         return res.status(200).send({
    //             product,
    //         });
    //     });
    // },

    saveUser: async (req, res) => {
        let user = new User();
        let params = req.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(params.password, saltRounds);     

        user.username = params.username;
        user.name = params.name;
        user.passwordHash = passwordHash;

        user.save((error, userStored) => {
            if (error)
                return res.status(500).send({
                    message: "Error al guardar el usuario",
                });

            if (!userStored)
                return res.status(400).send({
                    message: "No se envió ningún usuario para guardar",
                });

            return res.status(200).send({
                usuario: userStored,
                Estado: "Guardado",
            });
        });
    },

    // updateProduct: (req, res) => {
    //     let productName = req.params.name;
    //     let body = req.body;

    //     // function toJSON(string) {
    //     //     console.log(string);
    //     //     let stringJSON = string.replace(/['"]+/g, '"');
    //     //     let json = JSON.parse(stringJSON);
    //     //     return json;
    //     // }

    //     const update = {};

    //     if (body.name) update.name = body.name;
    //     if (body.price) update.price = body.price;
    //     if (body.stock) update.stock = body.stock;
    //     if (body.features) update.features = body.features;

    //     Product.findOneAndUpdate(
    //         { name: productName },
    //         update,
    //         { new: true },
    //         (err, productUpdated) => {
    //             if (err)
    //                 return res.status(500).send({
    //                     message: "Error al actualizar los datos del producto",
    //                 });

    //             if (!productUpdated)
    //                 return res.status(400).send({
    //                     message: "El proyecto ha actualizar no existe",
    //                 });

    //             return res.status(200).send({
    //                 Producto: productUpdated,
    //                 Estado: "Actualizado",
    //             });
    //         }
    //     );
    // },

    // deleteProduct: (req, res) => {
    //     let productName = req.params.name;
    //     Product.findOneAndDelete({ name: productName }, (err, productDeleted) => {
    //         if (err)
    //             return res.status(500).send({
    //                 message: "Ha ocurrido un error al borrar el producto",
    //             });

    //         if (!productDeleted)
    //             return res.status(400).send({
    //                 message: "No se puede borrar producto, ya que este no existe",
    //             });

    //         return res.status(200).send({
    //             Producto: productDeleted,
    //             Estado: "Eliminado",
    //         });
    //     });
    // },
};

module.exports = controller;
