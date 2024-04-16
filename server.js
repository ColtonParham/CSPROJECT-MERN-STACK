require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const fileupload = require("express-fileupload");
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');        // Checks JWT bearer token. Returns 403 error if token is missing/invalid
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;
const rateLimiter = require("./middleware/limiter");
mongoose.set('strictQuery', false);

app.disable('x-powered-by'); // Removes information about server to reduce information exposure. Will checkout additional middleware named helmet. May assist in preventing information exposure of middlewear software.

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// File Uploads
app.use(fileupload());

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(rateLimiter.globalLimiter); // Rate limits unreasonable request amounts

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', rateLimiter.loginLimiter, require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/profile', require('./routes/api/profile'));

app.use('/friends', verifyJWT, rateLimiter.friendLimiter, require('./routes/api/friends'));
app.use('/users', verifyJWT, require('./routes/api/users'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});