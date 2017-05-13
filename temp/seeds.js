var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data =  [
    {
        name: "Camp Dog",
        image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg",
        description: "bla blah"
    },
    {
        name: "Camp Inbreed",
        image: "http://www.visitcentraliowa.com/images/campground.jpg",
        description: "bla blah"
    },
    {
        name: "Camp Poorman",
        image: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
        description: "bla blah"
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("Campgrounds Removed!");
        //Add CG
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Campground added");
                    //add comments
                    Comment.create({
                        text: "Great place!",
                        author: "Homer"
                    }, function(err, comment){
                        if (err) {
                            console.log(err);
                        }else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new Comment");
                        }

                    });
                }
            });
        });
    });

};








module.exports = seedDB;
