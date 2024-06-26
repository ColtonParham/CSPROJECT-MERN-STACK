const User = require('../model/User');
const jwt = require('jsonwebtoken');
const val = require('validator');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!(cookies?.jwt && val.isJWT(cookies.jwt))) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const exp = Date.now() + 60 * 1000;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "userID":   foundUser._id,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            );
            res.json({ roles, accessToken, exp })
        }
    );
}

module.exports = { handleRefreshToken }