const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
    friendID: {
        type: ObjectId,
        required: true
    },
    userID: {
        type: ObjectId,
        required: true
    }
});

module.exports = mongoose.model('FriendRequest', friendRequestSchema);