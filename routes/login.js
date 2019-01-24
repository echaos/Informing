const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', (req, res) => {
    console.log(req.cookies["login_failed"]);
    res.render('index.ejs', {action: "login", login_failed: req.cookies["login_failed"], title:"Yes", have_login:false, username:"Guest"},);
});

router.post('/', (req, res) => {

    var login_status = -1;

    let db = new sqlite3.Database('app.db', error => {
        if (error) {
            return console.error(error.message);
        }
    });

    let sql = "SELECT user_name, user_password FROM users;";
    db.all(sql, [], (error, rows) => {
        if (error) {
            throw error;
        }

        rows.forEach(row => {
            if (row.user_name === req.body.username && row.user_password === req.body.password) {
                res.cookie("login", "false", {maxAge: 9000000});
                res.cookie("username", row.username, {maxAge: 9000000});
                res.cookie("login_failed", "false", {maxAge: 9000000});
                res.redirect("/");
            } else {
                res.cookie("login_failed", "true", {maxAge: 1800});
                res.redirect("/login");
            }
        })
    });

    db.close(error => {
        if (error) {
            return console.error(error.message);
        }
    });

});

module.exports = router;