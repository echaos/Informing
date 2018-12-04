const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

function after_db() {

}

/* GET home page. */
router.get('/', function (req, res) {
    let login = true;
    let username;
    let db = new sqlite3.Database('db.sqlite3', error => {
        if (error) {
            return console.error(error.message);
        }
        console.log("Successfully connected to the database.");
    });

    let sql = "SELECT site_name, in_use FROM app_config;";
    db.all(sql, [], (error, rows) => {
        if (error) {
            throw error;
        }

        rows.forEach(row => {
            if (row["in_use"] === 1)
            {
                global.site_name = row["site_name"]
            }
        })
    });

    db.close(error => {
        if (error) {
            return console.error(error.message);
        }
        console.log("Successfully disconnected from the database.")
    });

    if (req.cookies["username"]) {
        username = req.cookies["username"];
        console.log(username);
    }

    if (req.cookies["login"] && req.cookies["login"] === "false") {
        login = false;
    }
    else {
        res.cookie('login', 'true', {maxAge: 9000000});
    }

    res.render('index.ejs', {title: global.site_name, login: login, username: username});
});

router.post('/', (req, res) => {
   if (req.body.logout === "true"){
       res.cookie("login", "true", {maxAge: 9000000});
       res.redirect("/");
   }
});

module.exports = router;
