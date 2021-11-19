const User = require('../models/user.model');

const controller = {

	getShopcart: (req, res) => {
		const id = req.params.id;

		User.findById(id,"products", )
			.populate('products',{
                name: 1,
                price: 1,
                stock: 1,
            })
            .exec((err, shoptcart) => {
                if (err)
                    return res.status(500).send({
                        message: 'Error al devolver el usuario',
                    });

                if (!shoptcart)
                    return res.status(404).send({
                        message: 'No hay usuario que devolver',
                    });

                return res.status(200).send({ shoptcart });
            });
	},

	updateShopCart: (req, res) => {
		const id = req.params.id;
		const {
			body
		} = req;
		const products = body.products;

		User.findByIdAndUpdate(id, { products: products }, { new: true },
			(err, userUpdated) => {
				if (err) {
					console.log(err);
					return res.status(500).send({
						message: 'Error al actualizar los datos del usuario',
					});
				}

				if (!userUpdated)
					return res.status(400).send({
						message: 'El usuario ha actualizar no existe',
					});

				return res.status(200).send({
					Usuario: userUpdated,
					Estado: 'Actualizado',
				});
			}
		);
	},
};

module.exports = controller;