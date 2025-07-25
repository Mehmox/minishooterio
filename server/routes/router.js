const bcrypt = require("bcrypt");
const db = require("./Model");
const express = require("express");
const Routes = express.Router();
const cors = require("cors");
const path = require("path");

Routes.use(cors());
Routes.use(express.json());

Routes.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const isExists = await db.findOne({ email });
    if (!isExists) return res.send({ err: "Email or password was wrong!" });

    const { username } = isExists;

    console.log("User loged in.", { username, email });

    let isValid = await bcrypt.compare(password, isExists.password);
    if (!isValid) return res.send({ err: "Email or password was wrong!" });

    console.log("User loged in.", { username, email });

    res.send({ username: username })

});

Routes.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    // const isExists = await db.findOne({ email });
    // if (isExists) return res.send({ err: "This email already used!" });

    // const salt = bcrypt.genSaltSync(10);

    // const hash = bcrypt.hashSync(password, salt);

    // let profile = new db({ username, email, password: hash });

    // await profile.save();

    // console.log("New user registered.", { username, email });

    res.send({ username });

});

module.exports = Routes;