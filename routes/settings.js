const express = require('express');
const router = express.Router();
const initMiddleware = require('../middleware/initialize');

/* GET users listing. */
router.get('/', (req, res) => {
    initMiddleware.createOrOpenDB(res).then(()=>{
       initMiddleware.verifyDB(req, res).then(()=>{
            if (res.locals.first_time || req.session.have_login){
                res.render('index.ejs', {
                    action:"settings",
                    title: "Informing",
                    have_login: req.session.have_login,
                    username: "Guest"});
            } else {
                res.redirect("/login");
            }
       })
    });

});

router.post('/', initMiddleware.initialize, (req, res) => {
    res.locals.db.close();
    res.redirect("/login");
});

module.exports = router;