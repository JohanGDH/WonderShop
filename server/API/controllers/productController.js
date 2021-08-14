

var controller = {
    test: (req, res) => {
        return res.status(200).send({
            message: "Metodo Test"
        })
    }
}

module.exports = controller;