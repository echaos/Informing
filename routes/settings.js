const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const basicDB = require('../middleware/basicDB');
const initMiddleware = require('../middleware/initialize');

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('index.ejs', {action:"settings", title: "Informing", have_login: true, username: "Hello"});
});

router.post('/', initMiddleware.initialize, (req, res) => {
    console.log(req.body);
    res.render('index.ejs', {action:"settings", title: "Informing", have_login: true, username: "Yes"});
});

module.exports = router;