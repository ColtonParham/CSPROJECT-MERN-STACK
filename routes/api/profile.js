// A route to provide users with their profile pictures, if they exist. If they do not exist, then it will simply return the default profile picture

rateLimiter = require('../../middleware/limiter.js');
const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT.js');
const profileController = require('../../controllers/profileController.js');

router.get('/img/', profileController.getImage);

router.get('/img/:id', profileController.getImage);

router.post('/upload', verifyJWT, rateLimiter.uploadLimiter, profileController.uploadPFP);

module.exports = router;