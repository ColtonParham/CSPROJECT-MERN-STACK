
const uploadPFP = async (req, res) => {
    console.log("Profile Image Upload Started")
    if (!req?.user) return res.status(500).json({"message": "Error! Non-authed user. No user field found when attempting to upload pfp"})
    
    var file;
    if(!req.files)
        return res.status(400).send("No files were uploaded!");
    
    file = req.files.pfp;
    uploadPath = __dirname + '/../public/img/pfp/' + req.user + '.png';
    console.log(uploadPath);
    file.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err)
        res.send("File Uploaded");
    })
}

module.exports = { uploadPFP };