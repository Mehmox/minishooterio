require("dotenv").config({ path: "../../.env" });

const mongoose = require("mongoose");
const { mongoName, mongoPassword, mongoCluster, mongoDBName } = process.env;
const dburi = `mongodb+srv://${mongoName}:${mongoPassword}@${mongoCluster}.n7pdb.mongodb.net/${mongoDBName}?retryWrites=true&w=majority`;

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
