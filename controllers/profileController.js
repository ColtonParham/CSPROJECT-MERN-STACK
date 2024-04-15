const fs = require('fs');
const path = require('path');

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: Vulurn ignored due to rate limiting placed before accessing controller.
const uploadPFP = async (req, res) => {
    var file = req.files.pfp;
    allowedTypes = [ "image/jpeg", "image/png", "image/webp"];
    uploadPath = __dirname + '/../public/img/pfp/' + req.userID + '.png';
    
    if (!req?.user) return res.status(500).json({"message": "Error! Non-authed user. No user field found when attempting to upload pfp"})
    if (!req.files) return res.status(400).send("No files were uploaded!");
    console.log(file.mimetype);
    if (!allowedTypes.includes(file.mimetype)) return res.status(400).json({ "Message": "Filetype not supported"});

    file.mv(uploadPath, function(err) {
        if (err) {
            console.log("File upload error: " + err);
            return res.status(500);
        }
        res.send("File Uploaded");
    })
}

const getImage = async (req, res) => {
    const cookies = req.cookies;
    if (!req.params?.id) req.params.id = req.cookies.UserID;
    console.log(req.params.id);
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(req.params.id)) return res.status(400).json({ "Message": "Special characters are not allowed"});
    profilePath = path.join(__dirname, '..', 'public', 'img', 'pfp', req.params.id + '.png');
    if (fs.existsSync(profilePath))
        res.sendFile(profilePath);
    else
        res.sendFile(path.join(__dirname, '..', 'public', 'img', 'default.png'));
}

module.exports = { uploadPFP, getImage };