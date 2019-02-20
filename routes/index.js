const express = require('express');
const router = express.Router();
const initMiddleware = require("../middleware/initialize");

const PRIORITY_NAME = ["Normal", "Events", "Deadlines"];
const PRIORITY_CLASS = ["label-primary", "label-info", "label-danger"];

router.get('/', initMiddleware.initialize, function (req, res, next) {

    console.log(res.locals);
    if (res.locals.first_time) {
        return res.redirect("/settings");
    }

    console.log(req.session.user_name);


    let event_n = res.locals.post_list.filter(post => post.post_priority === 1).length;
    let deadline_n = res.locals.post_list.filter(post => post.post_priority === 2).length;
    let all_n = res.locals.post_list.length;

    res.locals.db.close();

    res.render('index.ejs', {
        action: "homepage",
        title: res.locals.app_name,
        have_login: req.session.have_login,
        username: req.session.user_name,
        post_list: res.locals.post_list,
        all_n: all_n,
        event_n: event_n,
        deadline_n: deadline_n,
        PRIORITY_NAME:PRIORITY_NAME,
        PRIORITY_CLASS:PRIORITY_CLASS,
    });
});

router.post('/', (req, res) => {
});

module.exports = router;
