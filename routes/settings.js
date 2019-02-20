const express = require('express');
const router = express.Router();
const initMiddleware = require('../middleware/initialize');

/* GET users listing. */
router.get('/',initMiddleware.initialize, (req, res) => {
    res.render('index.ejs', {action:"settings", title: "Informing", have_login: true, username: ""});
});

router.post('/', initMiddleware.initialize, (req, res) => {
    console.log(req.body);
    res.render('index.ejs', {action:"settings", title: res.locals.app_name, have_login: true, username: ""});
});

module.exports = router;