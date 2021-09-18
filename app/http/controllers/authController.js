const path = require("path");

// Factory method:
function authController() {
    return {
        login : function(req, res){
            res.render('auths/login');
        },

        register : function(req, res){
            res.render('auths/register');
        }
    }
}

module.exports = authController;