const Data = require('../model/Data');
const User = require('../model/User');

const getData = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});

}

const getUserData = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});

}

const uploadData = async (req, res) => {
    if (!req.userID) return res.status(500).json({"Message": "Non-authenticated user when authentication is expected"});

}

module.exports = {
    getData,
    getUserData,
    uploadData
}