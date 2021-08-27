const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const { server } = require("../../index");
const mongoose = require("mongoose");
const api  = require('./products.test');

describe.only('Creating a new user', ()=> {
    beforeEach(async () => {
        await User.deleteMany({});
        
        const password = await bcrypt.hash('password',5);
        const user = new User({username: 'test', name: 'testeito', passwordHash: password});
        await user.save();
    });

    afterAll(() => {
        mongoose.disconnect();
        server.close();
    });


    test('Works as expected creating a fresh user', async () => {
        const usersDB = await api.get('/API/users/list');
        console.log(usersDB.body.users);
        const usersAtStart = usersDB.body.users.map((user) => user);

        const newUser = {
            username: 'PEPELOL',
            name: 'Pepe',
            password: 'dorwssap'
        };

        await api
            .post("/API/users/new")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const usersDBAfter = await api.get("/API/users/list");
        console.log(usersDBAfter.body);
        const usersAtEnd = usersDBAfter.body.users.map((user) => user);
        console.log(usersAtEnd);

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usersNames = usersAtEnd.map(u => u.username);
        expect(usersNames).toContain(newUser.username);
    });
});