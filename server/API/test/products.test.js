const supertest = require('supertest');
const { app } = require('../../index');
const mongoose = require('mongoose');

const api = supertest(app);

test('Products are retorned as JSON', async () => {
    await api
        .get('/API/products')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});


afterAll(() => {
    mongoose.disconnect();
});
