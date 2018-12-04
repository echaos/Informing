const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('new.ejs', {title:"Informing", login:false, username:"Hello"});
    res.end();
});

module.exports = router;