const express = require('express');
const router = express.Router();
const initMiddleware = require("../middleware/initialize");

const null_post = {id:-1, title: "Does not exist", content:"Empty"};

router.get("/post/:ID", initMiddleware.initialize, (req, res) => {

    res.render("index.ejs", {
        action:"post",
        post_action:"show",
        title:"Informing",
        have_login:req.session.have_login,
        username:"Default",
        post: res.locals.post,
    });
});

module.exports = router;