const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose');
const val = require('validator')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    if (typeof user != "string" || typeof pwd != "string") return res.status(400).json({ 'message': 'Username and password must be strings'}); // Type validation
    if (!(val.isAlphanumeric(user) || val.isAlpha(user.charAt(0)))) res.status(400).json({"Message": "Invalid username"});
    const foundUser = await User.findOne({ username: user.toLowerCase() }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "userID":   foundUser._id,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        UserName = result.username
        UserName = UserName.charAt(0).toUpperCase() + UserName.slice(1); // Capitalizes the first letter for visual effect
        // Create cookie with user ID and username
        
        res.cookie("UserID", result._id.toString());
        res.cookie("UserName", UserName);

        // Send authorization roles and access token to user
        res.status(202).json({ roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };