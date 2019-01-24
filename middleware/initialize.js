const sqlite = require('sqlite3');

function extractAppSettings(res) {
    return new Promise(resolve => {
        console.log(res.locals.first_time);
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

function getPosts(req, res) {
    return new Promise(resolve => {
        if (res.locals.first_time) {
            resolve(true); //If it is the first time, skip this process
        } else if (Object.keys(req.params).length !== 0) {
            console.log(req.params);
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
            extractAppSettings(res).then(() => {
                getPosts(req, res).then(() => {
                    getPost(req, res).then(() => {
                        next();
                    })
                })
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