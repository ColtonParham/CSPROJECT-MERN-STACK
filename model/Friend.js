const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
    userIDs: {
        type: [ObjectId],
        required: true
    }
});

module.exports = mongoose.model('Friend', friendSchema);