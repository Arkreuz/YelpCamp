var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data =  [
    {
        name: "Camp Dog",
        image: "http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod justo sed nibh efficitur, eu malesuada nunc fermentum. Maecenas fringilla nulla ullamcorper velit accumsan rhoncus. In et massa mattis, semper orci ac, facilisis odio. Nullam imperdiet, nisi eu ornare ultricies, tortor diam semper odio, lacinia placerat odio sapien id lacus. Pellentesque posuere interdum posuere. Morbi blandit augue id nisl molestie elementum. Maecenas elementum justo non risus accumsan elementum. Nulla eu nunc ligula. Mauris cursus commodo urna, a faucibus erat tempor a. Mauris at dignissim magna. Vestibulum a hendrerit purus. Nulla elementum molestie ultrices. Donec venenatis sodales elit, vitae facilisis diam hendrerit sed."
    },
    {
        name: "Camp Inbreed",
        image: "http://www.visitcentraliowa.com/images/campground.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod justo sed nibh efficitur, eu malesuada nunc fermentum. Maecenas fringilla nulla ullamcorper velit accumsan rhoncus. In et massa mattis, semper orci ac, facilisis odio. Nullam imperdiet, nisi eu ornare ultricies, tortor diam semper odio, lacinia placerat odio sapien id lacus. Pellentesque posuere interdum posuere. Morbi blandit augue id nisl molestie elementum. Maecenas elementum justo non risus accumsan elementum. Nulla eu nunc ligula. Mauris cursus commodo urna, a faucibus erat tempor a. Mauris at dignissim magna. Vestibulum a hendrerit purus. Nulla elementum molestie ultrices. Donec venenatis sodales elit, vitae facilisis diam hendrerit sed."
    },
    {
        name: "Camp Poorman",
        image: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod justo sed nibh efficitur, eu malesuada nunc fermentum. Maecenas fringilla nulla ullamcorper velit accumsan rhoncus. In et massa mattis, semper orci ac, facilisis odio. Nullam imperdiet, nisi eu ornare ultricies, tortor diam semper odio, lacinia placerat odio sapien id lacus. Pellentesque posuere interdum posuere. Morbi blandit augue id nisl molestie elementum. Maecenas elementum justo non risus accumsan elementum. Nulla eu nunc ligula. Mauris cursus commodo urna, a faucibus erat tempor a. Mauris at dignissim magna. Vestibulum a hendrerit purus. Nulla elementum molestie ultrices. Donec venenatis sodales elit, vitae facilisis diam hendrerit sed."
    }
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
