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
const https = require("https");
const fs = require("fs");

// Https options
const httpsPort = process.env.HTTPS_PORT || 443;
var useHttps = process.env.USE_HTTPS === "true" || false;
var httpsOptions;
// If using HTTPS, check if required certs are in ./rsa folder, and use them. Otherwise, disable https.
if (useHttps && fs.existsSync('rsa/server-key.pem') && fs.existsSync('rsa/server-cert.pem')) {
    httpsOptions = {
        key: fs.readFileSync('./rsa/server-key.pem'),
        cert: fs.readFileSync('./rsa/server-cert.pem')
        }
} else
    useHttps = false;



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

// API specific
app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/friends', verifyJWT, rateLimiter.friendLimiter, require('./routes/api/friends'));
app.use('/api/users', verifyJWT, require('./routes/api/users'));

app.all('*', (req, res) => {
    res.status(404);
    console.log(req.accepts('html'))
    if (req.accepts('html')) {
        console.log("Sending 404 page")
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
    if (useHttps)
        https.createServer(httpsOptions, app).listen(httpsPort, () => console.log(`Secure server running on port ${httpsPort}`))
});