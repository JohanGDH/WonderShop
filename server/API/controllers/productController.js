const Product = require('../models/product.model');
const cloudinary = require('cloudinary');

const controller = {
    test: (req, res) => res.status(200).send({
        message: 'Metodo Test'
    }),

    listProducts: (req, res) => {
        Product.find({}).sort('+price').exec((err, products) => {
            if(err) return res.status(500).send({
                message: 'Error al listar los productos'
            });

            if(!products) return res.status(404).send({
                message: 'No hay productos que listar'
            });

            return res.status(200).send({products});
        });
    },

    getProduct: (req, res) => {
        const productName = req.params.name;

        if(productName == null) {
            return res.status(404).send({
                message: 'El nombre especificado no es válido'
            });
        }

        Product.find({name: productName},(err, product) => {
            if(err) return res.status(500).send({
                message: 'Error al devolver el producto',
                err
            });

            if(product.length < 1 || err) return res.status(404).send({
                message: 'Producto no encontrado',
            });

            return res.status(200).send({
                product
            });
        });
    },



    saveProduct: (req, res) => {
        const product = new Product();
        const params = req.body;

        product.name = params.name;
        product.price = params.price;
        product.stock = params.stock;
        product.features = params.features;
        product.image = null;

        product.save((error, productStored) => {
            if(error) return res.status(500).send({
                message: 'Error al guardar el producto',
                error
            });

            if(!productStored) return res.status(400).send({
                message: 'No se envió ningún producto para guardar',
                error,
            });

            return res.status(200).send({
                'Producto': productStored,
                'Estado': 'Guardado'
            });
        });
    },


    updateProduct: (req, res) => {
        const productName = req.params.name;
        const {body} = req;
        const update = {};

        if(body.name) update.name = body.name;
        if(body.price) update.price = body.price;
        if(body.stock) update.stock = body.stock;
        if(body.features) update.features = body.features;

        Product.findOneAndUpdate({name: productName}, update, { new: true}, (err, productUpdated) => {
            if(err) return res.status(500).send({
                message: 'Error al actualizar los datos del producto'
            });

            if(!productUpdated) return res.status(400).send({
                message: 'El proyecto ha actualizar no existe'
            });

            return res.status(200).send({
                Producto : productUpdated,
                Estado : 'Actualizado'
            });
        });
    },

    deleteProduct: (req, res) => {
        const productName = req.params.name;
        Product.findOneAndDelete({name: productName}, (err, productDeleted) => {
            if(err) return res.status(500).send({
                message: 'Ha ocurrido un error al borrar el producto'
            });

            if(!productDeleted) return res.status(400).send({
                message: 'No se puede borrar producto, ya que este no existe'
            });

            return res.status(200).send({
                Producto : productDeleted,
                Estado : 'Eliminado'
            });
        });
    },

    uploadImg: async (req, res) => {

        const productID = req.params.id;        
        const img = req.file;
        
        if(!img) return res.status(400).send({
            message: 'No se ha enviado una imagen'
        });
                
        const result = await cloudinary.v2.uploader.upload(img.path);

        Product.findByIdAndUpdate(productID,{
            image: {
                title:img.filename,
                path: result.secure_url,
                size: img.size,
                mimeType: img.mimetype
            }
        
        }, {new:true}, (err, productUpdated) => {
            if(err) return res.status(500).send({
                message: 'Error al actualizar los datos del producto'
            });

            if(!productUpdated) return res.status(400).send({
                message: 'El proyecto ha actualizar no existe'
            });

            return res.status(200).send({
                Producto : productUpdated,
                Estado : 'Actualizado'
            });
        });        
    }

};

module.exports = controller;