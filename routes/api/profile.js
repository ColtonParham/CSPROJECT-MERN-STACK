// A route to provide users with their profile pictures, if they exist. If they do not exist, then it will simply return the default profile picture

const express = require('express');
const router = express.Router();
const path = require('path');
const verifyJWT = require('../../middleware/verifyJWT.js');
const fs = require('fs');
const profileController = require('../../controllers/profileController.js');

router.get('/img/', (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    profilePath = path.join(__dirname, '..', '..', 'public', 'img', 'pfp', cookies.UserName + '.png');
    if (fs.existsSync(profilePath))
        res.sendFile(profilePath);
    else
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'img', 'default.png'));
})

router.get('/img/:id', (req, res) => {
    profilePath = path.join(__dirname, '..', '..', 'public', 'img', 'pfp', req.params.id + '.png');
    if (fs.existsSync(profilePath))
        res.sendFile(profilePath);
    else
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'img', 'default.png'));
});

router.post('/upload', verifyJWT, profileController.uploadPFP);

module.exports = router;