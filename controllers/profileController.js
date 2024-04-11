const fs = require('fs');

const uploadPFP = async (req, res) => {
    var file = req.files.pfp;
    allowedTypes = [ "image/jpeg", "image/png", "image/webp"];
    uploadPath = __dirname + '/../public/img/pfp/' + req.user + '.png';
    
    if (!req?.user) return res.status(500).json({"message": "Error! Non-authed user. No user field found when attempting to upload pfp"})
    if (!req.files) return res.status(400).send("No files were uploaded!");
    console.log(file.mimetype);
    if (!allowedTypes.includes(file.mimetype)) return res.status(400).send("Filetype not supported");

    file.mv(uploadPath, function(err) {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        res.send("File Uploaded");
    })
}

const getImage = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    profilePath = path.join(__dirname, '..', '..', 'public', 'img', 'pfp', cookies.UserName + '.png');
    if (fs.existsSync(profilePath))
        res.sendFile(profilePath);
    else
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'img', 'default.png'));
}

module.exports = { uploadPFP, getImage };