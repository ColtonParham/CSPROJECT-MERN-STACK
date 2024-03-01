const mongoose = require("mongoose")
const {MONGODB_URL} = process.env
exports.connect = () => 
{
    console.log(typeof MONGODB_URL);
    }
