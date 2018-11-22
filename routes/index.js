const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.ejs', {title: 'Informer'});
    let db = new sqlite3.Database('app.db', error => {
        if (error)
        {
            return console.error(error.message);
        }
        console.log("Successfully connected to the database.");
    });
    db.close(error => {
        if (error) {
            return console.error(error.message);
        }
        console.log("Successfully disconnected from the database.")
    });
});

module.exports = router;
