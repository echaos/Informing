const express = require('express');
const router = express.Router();
const initMiddleware = require("../middleware/initialize");

const null_post = {id: -1, title: "Does not exist", content: "Empty"};

router.get("/post/:ID", initMiddleware.initialize, (req, res) => {

    res.render("index.ejs", {
        action: "post",
        post_action: "show",
        title: res.locals.app_name,
        have_login: req.session.have_login,
        username: req.session.user_name,
        post: res.locals.post,
    });
});

router.post("/post/:ID", initMiddleware.initialize, (req, res) => {

    if (req.session.have_login) {
        res.locals.db.serialize(() => {
            res.locals.db.run("DELETE FROM posts WHERE post_id =" + req.params["ID"] + ";");
            res.redirect("/");
        });
    } else {
        res.redirect("back");
    }

});

module.exports = router;