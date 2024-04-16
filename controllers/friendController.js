const { ObjectId } = require('mongodb');
const Friend = require('../model/Friend');
const FriendRequest = require('../model/FriendRequest');
const User = require('../model/User');

const getAllFriends = async (req, res) => {
    if (!req.body?.limit) req.body.limit = 50;
    const friends = await Friend.find({userIDs: req.userID}, {userID: 0}, {limit: req.body.limit}).exec();
    const friendList = [];
    for await (const friend of friends) {
        const friendIDs = friend.userIDs
        var friendUser = friendIDs[0].toString()==req.userID ? friendIDs[1] : friendIDs[0];
        console.log("User ID:" + req.userID)
        friendName = await User.findById(friendUser);
        console.log(friendName);
        friendList.push({"user": friendName.username, "userID": friendName._id})
        console.log(friendList);
    }
    console.log("Outside")
    console.log(friendList);
    return res.status(201).send(friendList);
}

const removeFriend = async (req, res) => {
    if (!req.body?.friendID) return res.status(400).json({"Message": "Must include the userID of the friend you wish to remove"});
    if (!req.userID) return res.status(401);
    const result = await Friend.deleteOne({userIDs: {$all: [req.userID, req.body.friendID]}})
    console.log(result);
    return res.status(201).send(result);
}

const getSentRequests = async (req, res) => {
    if (!req.body?.limit) req.body.limit = 50;
    const requests = await FriendRequest.find({userID: req.userID}, {userID: 0}, {limit: req.body.limit}).exec();
    if (!requests) return res.status(204).json({"Message": "No pending requests found"});
    return res.status(201).send(requests);
}

const getPendingRequests = async (req, res) => {
    if (!req.body?.limit) req.body.limit = 50;
    const requests = await FriendRequest.find({friendID: req.userID}, {friendID: 0}, {limit: req.body.limit}).exec();
    if (!requests) return res.status(204).json({"Message": "No pending requests found"});
    return res.status(201).send(requests);
}

const sendFriendRequest = async (req, res) => {
    if (!req.body?.friendUser) {
        console.log(req.body)
        return res.status(400).json({"Message": "Request must include friend's username (friendUser field missing)"})
    }
    if (typeof req.body.friendUser != "string") return res.status(400).json({ 'message': 'Username must be a string'}); // Added type validation
    const friend = await User.findOne({username: req.body.friendUser.toLowerCase()}).exec();
    
    if (!friend)
        return res.stauts(204).json({"Message": "User not found"});

    const dupe = await FriendRequest.findOne({friendID: req.body.friendID, userID: req.userID}).exec()
    if (dupe){
        console.log(dupe)
        return res.status(409).json({"Message": "Friend request already sent"});
    }
    try {
        //create and store the new friendRequest
        const result = await FriendRequest.create({
            friendID: friend,
            userID: req.userID
        });
        console.log(result);
            res.status(201).json({ 'success': `Friend Request sent!`, "FriendID": FriendRequest.FriendID, "RequestID": FriendRequest._id});
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const sendFriendResponse = async (req, res) => {
    if (!req.body?.requestID) return res.status(400).json({"Message": "Request must include the friend Request's ID (requestID field missing)"})
    if (req.body?.accept==undefined) {
        console.log(req.body.accept)
        return res.status(400).json({"Message": "Request must specify whether or not to accept the friend request (accept field missing)"})
    }
    const requestID = ObjectId.createFromHexString(req.body.requestID);
    const accept = req.body.accept;
    const request = await FriendRequest.findOne({_id: requestID}).exec();
    if (!request) return res.status(404).json({"Message": "Friend Request not found"});
    if (!request.friendID==req.userID) return res.sendStatus(401) // Friend request was not sent to the current user: Unauthorized
    const userID = request.userID;
    const friendID = request.friendID;
    var result;
    if (req.body.accept) {
        try {
            result = await Friend.create({
                userIDs: [userID, friendID]
            });
            console.log("Friend created: ")
            console.log(result);
        } catch (err) {
            return res.status(500).json({ 'message': err.message });
        }
    } else {
        result = {"Message": "Success"}
    }
    request.deleteOne({_id: req.body.requestID});   // Delete friend request

    return res.status(201).send(result);
}


module.exports = { getAllFriends, getSentRequests, getPendingRequests, sendFriendRequest, sendFriendResponse, removeFriend }