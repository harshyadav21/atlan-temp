const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection is successful");
}).catch((err) => {
    console.log(err);
    console.log("No onnection");
});