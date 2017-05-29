var Campground = require("../models/campground")
var Comment = require("../models/comment")
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if (req.isAuthenticated()) {

        //user owns camp?
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                res.redirect("back");
            }else {
                //user owns camp?
                //req.user._id is String
                //foundCampground.author.id is and object
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }else {
                    res.redirect("back");
                }

            }
        });
    }else {
        res.redirect("back");
    }
};


middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()) {

        //user owns camp?
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            }else {
                //user owns comment
                //req.user._id is String
                //foundCampground.author.id is and object
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }else {
                    res.redirect("back");
                }

            }
        });
    }else {
        res.redirect("back");
    }
};

middlewareObj. isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}




module.exports = middlewareObj;
