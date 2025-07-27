//src/Routes/Model.js
require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const { mongoName, mongoPassword, mongoDBName, mongoCollection } = process.env;
const dburi = `mongodb+srv://${mongoName}:${mongoPassword}@${mongoDBName}.n7pdb.mongodb.net/${mongoCollection}?retryWrites=true&w=majority`;

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

mongoose.connect(dburi)
    .then(() => console.log("db connected!"))
    .catch((err) => console.log(err))

module.exports = mongoose.model("User", userShema);;
