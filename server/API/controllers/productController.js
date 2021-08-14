'use strict'

var Product = require('../models/product.model')

var controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: "Metodo Test"
        })
    },

    listProducts: (req, res) => {
        Product.find({}).sort('+price').exec((err, products) => {
            if(err) return res.status(500).send({
                message: "Error al listar los productos" 
            })

            if(!products) return res.status(404).send({
                message: "No hay productos que listar"
            })

            return res.status(200).send({products})
        })
    }
}

module.exports = controller;