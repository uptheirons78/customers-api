const mongoose = require('mongoose');
require("dotenv").config({path: "./server/db/.env"});
const db = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds251819.mlab.com:51819/${process.env.DB_NAME}`

mongoose.Promise = global.Promise;
// connect to Database
mongoose.connect(db);

module.exports = {mongoose}; //ES6 for mongoose: mongoose