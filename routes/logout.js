const express = require('express');
router = express.Router();

router.get('/',(req, res)=>{
    req.session.destroy(function(err) {
        if(err){
            res.send("Failed to logout");
            return;
        }

        res.clearCookie("_session");
        res.redirect('/');
    });
});

module.exports = router;