const { ObjectId } = require('mongodb');
const Friend = require('../model/Friend');
const FriendRequest = require('../model/FriendRequest');
const User = require('../model/User');
const val = require('validator');

const getAllFriends = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});
    if (!req.body?.limit) 
        req.body.limit = 50;
    else
        if (!val.isInt(req.body.limit, {gt: 0})) return res.status(400).json({"Message": "limit value has to be an integer greater than 0"});

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
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});
    if (!req.body?.friendID) return res.status(400).json({"Message": "Must include the userID of the friend you wish to remove (friendID)"});
    if (!val.isMongoId(req.body.friendID)) return res.status(400).json({"Message": "Invalid friendID"});
    const result = await Friend.deleteOne({userIDs: {$all: [ObjectId(req.userID), ObjectId(req.body.friendID)]}})
    if (result.deletedCount>0)
        return res.status(201).json({"Message": "Successfully removed friend"});
    else
        return res.status(400).json({"Message": "No matching friend found"});
}

const cancelFriendRequest = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});
    if (!req.body?.friendID) return res.status(400).json({"Message": "Must include friendID to remove"});
    const friendID = req.body.friendID
    if (!val.isMongoId(friendID)) return res.status(400).json({"Message": "Invalid friendID"});
    
    const result = await FriendRequest.deleteOne({"friendID": friendID, "userID": req.userID});
    console.log(result)
    if (result.deletedCount>0)
        return res.status(201).json({"Message": "Successfully canceled friend request"});
    else
        return res.status(400).json({"Message": "No matching friend request found sent to friend ID " + friendID});
}

const getSentRequests = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});
    if (!req.body?.limit) 
        req.body.limit = 50;
    else
        if (!val.isInt(req.body.limit, {gt: 0})) return res.status(400).json({"Message": "limit value has to be an integer greater than 0"});
    const requests = await FriendRequest.find({userID: req.userID}, {userID: 0}, {limit: req.body.limit}).exec();
    if (!requests) return res.status(204).json({"Message": "No pending requests found"});
    console.log(requests)
    const requestsList = [];
    for await (const friend of requests) {
        var friendUser = friend.friendID.toString();
        console.log("User ID: " + req.userID)
        friendName = await User.findById(friendUser);
        console.log("Friend Name: " + friendName);
        requestsList.push({"user": friendName.username, "userID": friendName._id, "requestID": friend._id})
    }

    return res.status(201).send(requestsList);
}

const getPendingRequests = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});
    if (!req.body?.limit) 
        req.body.limit = 50;
    else
        if (!val.isInt(req.body.limit, {gt: 0})) return res.status(400).json({"Message": "limit value has to be an integer greater than 0"});
    const requests = await FriendRequest.find({friendID: req.userID}, {friendID: 0}, {limit: req.body.limit}).exec();
    if (!requests) return res.status(204).json({"Message": "No pending requests found"});
    console.log(requests)
    const requestsList = [];
    for await (const friend of requests) {
        var friendUser = friend.userID.toString();
        console.log("User ID: " + req.userID)
        friendName = await User.findById(friendUser);
        console.log("Friend Name: " + friendName);
        requestsList.push({"user": friendName.username, "userID": friendName._id, "requestID": friend._id})
    }
    return res.status(201).send(requestsList);
}

const sendFriendRequest = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});
    if (!req.body?.friendUser) return res.status(400).json({"Message": "Request must include friend's username (friendUser field missing)"});
    if (typeof req.body.friendUser != "string") return res.status(400).json({ 'message': 'Username must be a string'}); // Added type validation
    if (!val.isAlphanumeric(req.body.friendUser)) return res.status(400).json({"Message": "friendUser must be a valid username"});

    const friend = await User.findOne({username: req.body.friendUser.toLowerCase()}).exec();
    if (!friend)
        return res.status(204).json({"Message": "User not found"});
    console.log("Friend ID: " + friend._id);
    console.log("User ID: " + req.userID);
    const dupe = await FriendRequest.findOne({friendID: friend._id, userID: req.userID}).exec()
    if (dupe){
        console.log("Duplicate Friend request!");
        console.log(dupe);
        console.log("End of dupe");
        return res.status(409).json({"Message": "Friend request already sent"});
    }
    const dupe2 = await Friend.findOne({userIDs: {$all: [friend._id, req.userID]}}).exec()
    if (dupe2) {
        console.log("Duplicate friend");
        return res.status(400).json({"Message": "Already friends with user " + friend.username})
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
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});
    if (!req.body?.requestID) return res.status(400).json({"Message": "Request must include the friend Request's ID (requestID field missing)"});
    if (!val.isMongoId(req.body.requestID)) return res.status(400).json({"Message": "Invalid requestID field"});
    if (req.body?.accept==undefined) return res.status(400).json({"Message": "Request must specify whether or not to accept the friend request (accept field missing)"});

    const requestID = ObjectId.createFromHexString(req.body.requestID);
    const accept = req.body.accept;
    const request = await FriendRequest.findOne({_id: requestID}).exec();

    if (!request) return res.status(404).json({"Message": "Friend Request not found"});
    if (!(request.friendID==req.userID)) return res.sendStatus(401) // Friend request was not sent to the current user: Unauthenticated
    const userID = request.userID;
    const friendID = request.friendID;
    var result;
    if (req.body.accept) {
        try {
            result = await Friend.create({
                userIDs: [userID, friendID]
            });
            console.log("Friend created: ")
            result = {"Message": "Friend request accepted"}
        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    } else {
        result = {"Message": "Friend request declined"}
    }
    request.deleteOne({_id: req.body.requestID});   // Delete friend request

    return res.status(201).send(result);
}

module.exports = { getAllFriends, getSentRequests, getPendingRequests, sendFriendRequest, sendFriendResponse, removeFriend, cancelFriendRequest }