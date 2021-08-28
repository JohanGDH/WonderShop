const supertest = require('supertest');
const {app, server}  = require('../../index');
const Product = require('../models/product.model');
const mongoose = require('mongoose');
const api = supertest(app);

const initialProducts = [
    {
        name: 'Ryzen 3',
        price: 242,
        stock: 5,
        features: {
            boost: '5.2gHz',
            overclook: true
        },
    },
    {
        name: 'Redmi Note 8',
        price: 623,
        stock: 152,
        features: {
            color: 'Azul',
            ram: '8gb',
            rom: '128gb',
        },
    },
];

beforeEach(async () => {
    await Product.deleteMany({});

    const product1 = new Product(initialProducts[0]);
    await product1.save();

    const product2 = new Product(initialProducts[1]);
    await product2.save();
});

afterAll(() => {
    mongoose.disconnect();
    server.close();
});

describe('Testing a Product CRUD', () => {

    

    test("Products are retorned as JSON", async () => {
        await api
            .get("/API/products")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("Products are retorned", async () => {
        const response = await api.get("/API/products");
        expect(response.body.products).toHaveLength(initialProducts.length);
    });

    test("A valid product to save", async () => {
        const newProduct = {
            name: "Redmi Note 8",
            price: 800,
            stock: 11,
            features: { color: "Rojo", ram: "12gb", rom: "256gb" },
        };

        await api
            .post("/API/save")
            .send(newProduct)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/API/products");
        const names = response.body.products.map((product) => product.name);

        expect(response.body.products).toHaveLength(initialProducts.length + 1);
        expect(names).toContain(newProduct.name);
    });

});