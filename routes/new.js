const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('index.ejs', {action: "post", post_action:"new", title:"Informing", have_login:true, username:"Hello"});
    res.end();
});

router.post('/', (req, res) => {

});

module.exports = router;