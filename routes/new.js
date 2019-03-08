const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const initMiddleware = require("../middleware/initialize");

/* GET users listing. */
router.get('/', initMiddleware.initialize, (req, res) => {
    if (req.session.have_login) {
        res.render('index.ejs', {
            action: "post",
            post_action: "new",
            title: res.locals.app_name,
            have_login: req.session.have_login,
            username: req.session.user_name
        });
    } else {
        res.redirect("/login");
    }
});

router.post('/', initMiddleware.initialize, (req, res) => {

    console.log("POST");

    let title = req.body.title;
    let content = req.body.content;
    let post_priority = 0;

    let post_id = 0;

    if (res.locals.post_list.length !== 0)
    {
        post_id = res.locals.post_list[res.locals.post_list.length-1].post_id+1;
    }

    if (req.body.post_priority === "Events")
    {
        post_priority = 1;
    }

    if (req.body.post_priority === "Deadlines")
    {
        post_priority = 2;
    }

    if (title && content)
    {
        res.locals.db.serialize(()=>{
            let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            res.locals.db.run("INSERT INTO\tposts(post_id, post_title, post_date, post_content, post_priority) VALUES("+post_id+", '"+title+"', '" + date + "', '"+content+"', "+post_priority+");")
            res.redirect("/post/"+post_id);
        });
    }


});

module.exports = router;