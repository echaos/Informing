const init = require("../middleware/initialize");

function add_post(req, res) {
    return new Promise(resolve => {

    });
}

function edit_post(req, res) {
    return new Promise(resolve => {

    });
}

function delete_post(req, res) {
    return new Promise(resolve => {

    });
}

function serialization(req, res, next)
{
    switch (req.body.post_action)
    {
        case "new":
            add_post(req, res).then(()=>{next();});
            break;

        case "edit":
            edit_post(req, res).then(()=>{next();});
            break;

        case "delete":
            delete_post(req, res).then(()=>{next();});
            break;

        default:
            break;
    }
}

module.exports = serialization;