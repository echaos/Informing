const express = require('express');
const router = express.Router();
const initMiddleware = require("../middleware/initialize");

const null_post = {id:-1, title: "Does not exist", content}

router.get("/post/:ID", initMiddleware, (req, res) => {

    post = res.locals.post_list.filter(post => post.post_id = )

    res.render("index.ejs", {
        action:"post",
        title:"Informing",
        have_login:true,
        username:"Default",

    });
});

module.exports = router;