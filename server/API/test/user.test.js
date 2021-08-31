const supertest = require("supertest");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { app, server } = require("../../index");
const mongoose = require("mongoose");

const api = supertest(app);

describe.only("Creating a new user", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const password = await bcrypt.hash("password", 5);
        const user = new User({
            username: "test",
            name: "testeito",
            passwordHash: password,
        });
        await user.save();
    });

    test("Works as expected creating a fresh user", async () => {
        const usersDB = await api.get("/API/users/list");
        const usersAtStart = usersDB.body.users.map((user) => user);

        const newUser1 = {
            username: "PEPELOL",
            name: "Pepe",
            password: "dorwssap",
        };

        await api
            .post("/API/users/new")
            .send(newUser1)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const usersDBAfter = await api.get("/API/users/list");
        const usersAtEnd = usersDBAfter.body.users.map((user) => user);

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);        
        const usersNames = usersAtEnd.map((u) => u.username);
        expect(usersNames).toContain(newUser1.username);
    });

    test("creation fails with proper statuscode and message if username is already taken", async () => {
        const usersAtStart = await api.get("/API/users/list");

        const newUser = {
            username: "test",
            name: "Miguel",
            password: "midutest",
        };

        const result = await api
            .post("/API/users/new")
            .send(newUser)
            .expect(500)
            .expect("Content-Type", /application\/json/);

        expect(result.body.error.errors.username.message).toContain(
            "expected `username` to be unique"
        );
        const usersAtEnd = await api.get("/API/users/list");        
        expect(usersAtEnd.body.users).toHaveLength((usersAtStart.body.users).length);
    });

    afterAll(() => {
        mongoose.disconnect();
        server.close();
    });
});
