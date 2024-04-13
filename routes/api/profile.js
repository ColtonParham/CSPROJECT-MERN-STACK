// A route to provide users with their profile pictures, if they exist. If they do not exist, then it will simply return the default profile picture

const express = require('express');
const router = express.Router();
const path = require('path');
const verifyJWT = require('../../middleware/verifyJWT.js');
const fs = require('fs');
const profileController = require('../../controllers/profileController.js');

router.get('/img/', profileController.getImage);

router.get('/img/:id', profileController.getImage);

router.post('/upload', verifyJWT, profileController.uploadPFP);

module.exports = router;