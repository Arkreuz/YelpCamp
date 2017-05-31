var Campground = require("../models/campground")
var Comment = require("../models/comment")
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if (req.isAuthenticated()) {

        //user owns camp?
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                    req.flash("error", "Failed to find the campground");
                res.redirect("back");
            }else {
                //user owns camp?
                //req.user._id is String
                //foundCampground.author.id is and object
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }else {
                        req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }

            }
        });
    }else {
            req.flash("error", "You need to log in before do that ");
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
                        req.flash("error", "Youdon't have permission to do that ");
                    res.redirect("back");
                }

            }
        });
    }else {
            req.flash("error", "You need to log in before do that ");
        res.redirect("back");
    }
};

middlewareObj. isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to log in before do that ");
    res.redirect("/login");
}




module.exports = middlewareObj;
