// A route to provide users with their profile pictures, if they exist. If they do not exist, then it will simply return the default profile picture

const express = require('express');
const router = express.Router();
const path = require('path');
const logoutController = require('../controllers/logoutController');
const fs = require('fs');

router.get('/:id', (req, res) => {
    profilePath = path.join(__dirname, '..', 'public', 'img', 'pfp', req.params.id + '.png');
    console.log(profilePath)
    console.log(fs.existsSync(profilePath))
    if (fs.existsSync(profilePath))
        res.sendFile(profilePath);
    else
        res.sendFile(path.join(__dirname, '..', 'public', 'img', 'default.png'));
});

module.exports = router;