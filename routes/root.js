const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/main(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
});

router.get('/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
    console.log("index")
});

router.get('/signUp(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'signUp.html'));
    console.log("index")
});

router.get('/function(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'function.html'));
    console.log("index")
});

router.get('/maxCalc(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'maxCalc.html'));
    console.log("index")
});

router.get('/pwreset(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'pwreset.html'));
    console.log("index")
});

module.exports = router;