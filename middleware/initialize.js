const sqlite = require('sqlite3');

function extractAppSettings(res) {
    return new Promise(resolve => {
        if (!res.locals.first_time) {
            res.locals.db.get("select app_name from app_settings", [], (err, row) => {
                res.locals.app_name = row.app_name;
                resolve(true);
            })

        }
        resolve(true);
    })
}

function verifyDB(res) {
    return new Promise(resolve => {
        console.log("Verifying");
        res.locals.db.get("select * from sqlite_master where type='table' and name='app_settings'", [], (err, row) => {
            if (err) {
                console.log("Error: " + err);
                console.log("Verification Error Occurred.");
                resolve(false);
            }

            if (row) {
                res.locals.first_time = false;
            } else {
                res.locals.first_time = true;
            }
            resolve(true);
        })
    })
}

function createOrOpenDB(res) {
    return new Promise(resolve => {
        res.locals.db = new sqlite.Database('app.db', sqlite.OPEN_READWRITE, err => {
            if (err) {
                console.log("Open Error Occurred.");
                console.log("Trying to create it");
                res.locals.db = new sqlite.Database('app.db', sqlite.OPEN_CREATE | sqlite.OPEN_READWRITE, err => {
                    if (err) {
                        resolve(false);
                    }
                });
                console.log("Successfully created.");
                resolve(true);
            }
            resolve(true);
        });
    })
}


function getPost(req, res) {
    return new Promise((resolve => {
        if (res.locals.first_time) {
            resolve(true);
        } else if (Object.keys(req.params).length === 0) {
            resolve(true);
        } else {
            res.locals.db.get("select post_id, post_title, post_priority, post_content from posts where post_id=" + req.params["ID"] + ";", [], (err, row) => {
                if (err) {
                    resolve(false);
                }
                console.log(row);
                res.locals.post = row;
                resolve(true);
            });
        }
    }))
}

function createAppSettingTable(req, res) {
    return new Promise(resolve => {

        console.log(req.body);
        //If it is the first time
        if (res.locals.first_time) {
            res.locals.db.serialize(() => {
                console.log(req.body);
                //Create a table for storing website data
                res.locals.db.run("CREATE TABLE `app_settings` (`app_name` TEXT NOT NULL DEFAULT 'App_name');");
                res.locals.db.run("INSERT INTO app_settings(app_name) VALUES ('" + req.body.site_name + "');");

                //Create a table for storing user data
                res.locals.db.run("CREATE TABLE `users` ( `user_name` TEXT NOT NULL UNIQUE, `user_password` TEXT NOT NULL, `user_permission` INTEGER NOT NULL );");
                let combined_text = "'" + req.body.username + "','" + req.body.password + "', 2";
                res.locals.db.run("INSERT INTO users(user_name, user_password, user_permission) VALUES (" + combined_text + ");");

                let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                res.locals.db.run("CREATE TABLE `posts` ( `post_id` INTEGER NOT NULL UNIQUE, `post_title` TEXT NOT NULL, `post_date` TEXT NOT NULL, `post_content` TEXT NOT NULL, `post_priority` INTEGER NOT NULL, PRIMARY KEY(`post_id`) );")
                res.locals.db.run("INSERT INTO\tposts(post_id, post_title, post_date, post_content, post_priority) VALUES(0, 'Your first title', '" + date + "', 'Content', 0);")
            });
        }
        resolve(true);
    })
}

function getPosts(req, res) {
    return new Promise(resolve => {
        if (res.locals.first_time) {
            resolve(true); //If it is the first time, skip this process
        } else if (Object.keys(req.params).length !== 0) {
            resolve(true); //If the url has certain parameters inside.
        } else {
            res.locals.db.all("select post_id, post_title, post_priority from posts", [], (err, rows) => {

                if (err) {
                    resolve(false);
                }

                res.locals.post_list = rows;
                resolve(true)
            });
        }
    })
}

function initialize(req, res, next) {
    createOrOpenDB(res).then(() => {
        verifyDB(res).then(() => {
            createAppSettingTable(req, res).then(() => {
                extractAppSettings(res).then(() => {
                    getPosts(req, res).then(() => {
                        getPost(req, res).then(() => {
                            next();
                        });
                    });
                });

            });
        });
    });
}


module.exports = {
    initialize: initialize,
    createOrOpenDB: createOrOpenDB,
    verifyDB: verifyDB,
    extractAppSettings: extractAppSettings,

};