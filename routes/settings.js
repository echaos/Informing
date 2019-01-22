const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const basicDB = require('../middleware/basicDB');

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('settings.ejs', {title: "Informing", login: false, username: "Hello"});
});

router.post('/', basicDB, (req, res) => {
    res.render('settings.ejs', {title: "Informing", login: false, username: "Yes"});
});

module.exports = router;