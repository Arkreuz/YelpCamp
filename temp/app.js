var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var seedDB = require("./seeds");
var ejsLint = require('ejs-lint');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});


//Index route
app.get("/campgrounds", function(req, res){
//Get all campgrounds from db
Campground.find({}, function(err, allCampgrounds){
    if(err){
        console.log(err);
    } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
    }
});
});

//Create route
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc =  req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //create new campground and save to database

    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });





});

//New route
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});


//Show route
app.get("/campgrounds/:id", function(req, res) {
    //find campground with provided ID

Campground.findById( req.params.id).populate("comments").exec( function(err, foundCampground){
    if(err){
        console.log(err);
    } else {
        //render show template
        res.render("campgrounds/show", {campground: foundCampground});
    }
});


});



//=================================
//Comments Routes
//=================================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {campground: campground});
        }
    })

});


app.post("/campgrounds/:id/comments", function(req, res){
    //lookup Camp ID
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
            res.redirect("/campgrounds")
        }
        else {
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err);
                }
                else {
                    campgrounds.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comments
    //connect new comment to campgrounds
    //redirect camp to show page
});


app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function(){
    console.log("SERVER IS RUNNING!");
});
