const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const initMiddleware = require('../middleware/initialize');

/* GET users listing. */
router.get('/',initMiddleware.initialize, (req, res) => {

    if (res.locals.first_time) {
        return res.redirect("/settings");
    }

    if (req.session.have_login)
    {
       return res.redirect("/");
    }

    return res.render('index.ejs', {action: "login", login_failed: req.cookies["login_failed"], title:"Yes", have_login:false, username:"Guest"},);
});

router.post('/', (req, res) => {

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
                req.session.regenerate(err=>{
                    if (err)
                    {
                        res.redirect("/login");
                    }

                    req.session.user_name = row.user_name;
                    req.session.have_login = true;
                    res.redirect("/");
                })
            } else {
                res.cookie("login_failed", "true", {maxAge:5*1000});
                res.redirect("/login", );
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