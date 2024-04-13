const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');


router.get('^/$|/main(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
});

router.get('/:page', (req, res, next) => {
    console.log(req.params.page);
    page = req.params.page.slice(-5) == '.html' ?  req.params.page : req.params.page + '.html' // If there's .html in the path leave it, otherwise, add it
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;        // Regex for if there are any special characters
    if (format.test(page.slice(0, -5))) return res.sendStatus(400); // Check for bad characters in parameter (prevents path traversal)
    if (!fs.existsSync(path.join(__dirname, '..', 'views', page)))  // Check if path exists. If no, go to next route
        return next();
    return res.sendFile(path.join(__dirname, '..', 'views', page));
})


module.exports = router;