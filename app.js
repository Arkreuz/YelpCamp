var express     = require("express"),
app         = express(),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
passport = require("passport"),
LocalStrategy = require("passport-local"),
Campground  = require("./models/campground"),
Comment     = require("./models/comment"),
User = require ("./models/user"),
seedDB      = require("./seeds")


//require routes
var commentRoutes =  require("./routes/comments"),
campgroundsRoutes =  require("./routes/campgrounds"),
indexRoutes =  require("./routes/index");

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname);
// seedDB(); //seed the database

//PASSPORT configuration

app.use(require("express-session")({
    secret: "Cherry is awesome",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser= req.user;
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function(){
    console.log("SERVER IS RUNNING!");
});
