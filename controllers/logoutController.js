const User = require('../model/User');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.status(204);
        return res.redirect('/login'); //No content
    }
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (foundUser) {
        // Delete refreshToken in db
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        console.log(result);
    }
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('UserID');
    res.clearCookie('UserName');
    res.status(204);
    res.redirect('/login');
}

module.exports = { handleLogout }