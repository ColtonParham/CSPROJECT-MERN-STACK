const { ObjectId, Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Data = new Schema({
    user: {
        type: ObjectId,
        required: true
    },
    timeStamp: {
        type: Date,
        required: true
    },
    formula: {
        type: String,
        required: true
    },
    data: {
        type: Double,
        required: true
    }
});

module.exports = mongoose.model('Data', Data);