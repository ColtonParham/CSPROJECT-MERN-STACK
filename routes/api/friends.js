// A route to allow users to create, send, accept, and reject friend requests.

rateLimiter = require('../../middleware/limiter.js');
const express = require('express');
const router = express.Router();
const friendController = require('../../controllers/friendController.js');

router.get('/get/', friendController.getAllFriends);

router.get('/request/received', friendController.getPendingRequests);

router.get('/request/sent', friendController.getSentRequests);

router.post('/remove/', friendController.removeFriend)

router.post('/request/send', friendController.sendFriendRequest);

router.post('/request/respond', friendController.sendFriendResponse);

module.exports = router;