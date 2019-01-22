// const sqlite = require("sqlite3");
const init = require("../middleware/initialize");

function createAppSettingTable(req, res) {
    return new Promise(resolve => {

        //If it is the first time
        if (res.locals.first_time) {
            res.locals.db.serialize(() => {

                //Create a table for storing website data
                res.locals.db.run("CREATE TABLE `app_settings` (`app_name` TEXT NOT NULL DEFAULT 'App_name');");
                res.locals.db.run("INSERT INTO app_settings(app_name) VALUES ('"+req.body.site_name+"');");

                //Create a table for storing user data
                res.locals.db.run("CREATE TABLE `users` ( `user_name` TEXT NOT NULL UNIQUE, `user_password` TEXT NOT NULL, `user_permission` INTEGER NOT NULL );");
                let combined_text = "'" + req.body.username + "','" + req.body.password + "', 2";
                res.locals.db.run("INSERT INTO users(user_name, user_password, user_permission) VALUES (" + combined_text + ");");

                let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/,'');
                res.locals.db.run("CREATE TABLE `posts` ( `post_id` INTEGER NOT NULL UNIQUE, `post_title` TEXT NOT NULL, `post_date` TEXT NOT NULL, `post_content` TEXT NOT NULL, `post_priority` INTEGER NOT NULL, PRIMARY KEY(`post_id`) );")
                res.locals.db.run("INSERT INTO\tposts(post_id, post_title, post_date, post_content, post_priority) VALUES(0, 'Your first title', '"+date+"', 'Content', 0);")
            });
        }
        resolve(true);
    })
}

function initializeDB(req, res, next) {
    init.createOrOpenDB(res).then(() => {
        console.log("Created Or Opened");
        init.verifyDB(res).then(() => {
            console.log("Verified");
            init.extractAppSettings(res).then(() => {
                console.log("Extracted");
                createAppSettingTable(req, res).then(() => {
                    console.log("Try to create app setting table");
                    next()
                })
            })
        })
    })
}

module.exports = initializeDB;