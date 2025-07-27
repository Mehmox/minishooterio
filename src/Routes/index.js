//src/Routes/index.js
const bcrypt = require("bcrypt");
const db = require("./Model");
const express = require("express");
const Routes = express.Router();
const cors = require("cors");

Routes.use(express.json());
Routes.use(cors());

// Routes.use((req, res, next) => {
//   if (req.method === "GET" && req.path !== "/") {
//     return res.status(403).send("Only '/' GET is allowed");
//   }
//   next();
// });

Routes.post("/login", async (req, res) => {

    let err;

    const { email, password } = req.body;

    const isExists = await db.findOne({ email });

    let isValid;

    if (isExists) {

        isValid = await bcrypt.compare(password, isExists.password);

        if (isValid) console.log("User loged in.", { username, email });

    } else err = "Email or password was wrong!"

    res.send({ err, username: isExists?.username });

});

Routes.post("/register", async (req, res) => {

    let err;

    const { username, email, password } = req.body;

    const isExists = await db.findOne({ email });

    if (!isExists) {

        let profile;

        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);

        profile = new db({ username, email, password: hash });

        await profile.save();

        console.log("New user registered.", { username, email });

    }

    res.send({ err, username: isExists?.username });

});

module.exports = Routes;