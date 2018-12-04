const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('login.ejs', {login_failed:req.cookies["login_failed"]});
    res.end();
});

router.post('/', (req, res) => {

    var login_status = -1;

    let db = new sqlite3.Database('db.sqlite3', error => {
        if (error) {return console.error(error.message);}
    });

    let sql = "SELECT id, username, password FROM users;";
    db.all(sql, [], (error, rows) => {
        if (error) {throw error;}

        rows.forEach(row => {
            if (row.username === req.body.username && row.password === req.body.password)
            {
                res.cookie("login", "false", {maxAge: 9000000});
                res.cookie("username", row.username, {maxAge: 9000000});
                res.cookie("login_failed", "false", {maxAge: 9000000});
                res.redirect("/");
            }
            else
            {
                res.cookie("login_failed", "true", {maxAge: 1800});
                res.redirect("/login");
            }
        })
    });

    console.log(login_status);
    db.close(error => {if (error) {return console.error(error.message);}});



});

module.exports = router;