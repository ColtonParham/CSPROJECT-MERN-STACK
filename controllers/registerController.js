const User = require('../model/User');
const bcrypt = require('bcrypt');
const val = require('validator');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    if (typeof user != "string" || typeof pwd != "string") return res.status(400).json({ 'message': 'Username and password must be strings'}); // type validation

    // Check if username is valid
    if (!val.isAlphanumeric(user)) return res.status(400).json({ 'message': 'Username must not contain special characters'});
    if (!val.isAlpha(user.charAt(0))) return res.status(400).json({ 'message': 'Username must start with a letter'});

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user.toLowerCase() }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user.toLowerCase(),
            "password": hashedPwd
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };