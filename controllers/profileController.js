const fs = require('fs');
const path = require('path');
const val = require('validator');

// file deepcode ignore NoRateLimitingForExpensiveWebOperation: Vulurn ignored due to rate limiting placed before accessing controller.
const uploadPFP = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});
    if (!req?.files) return res.status(400).json({"message": "No files were uploaded!"});
    if (!req.files?.pfp) return res.status(400).json({"Message": "No file under field pfp was uploaded"});
    var file = req.files.pfp;
    allowedTypes = [ "image/jpeg", "image/png", "image/webp"];
    uploadPath = __dirname + '/../public/img/pfp/' + req.userID + '.png';
    
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
    rootPath = './public/img/'
    if (!req.params?.id) req.params.id = req.cookies.UserID;
    if (!val.isMongoId(req.params.id+"")) return res.status(400).json({ "Message": "Invalid userID (field id)", "Given": req.params.id});
    profilePath = path.join('public', 'img', 'pfp', req.params.id + '.png');
    if (fs.existsSync(profilePath))
        res.sendFile('/pfp/' + req.params.id + '.png', {root: rootPath});
    else
        res.sendFile(path.join('default.png'), {root: rootPath});
}

module.exports = { uploadPFP, getImage };