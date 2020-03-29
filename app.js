var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var MiddleFun = require("./middleware/index");

app.locals.moment = require("moment");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
const PORT = process.env.PORT || 3000;

if(process.env.MODE && process.env.MODE == production) {
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true}).then(() => {
		console.log("Connected");	
	}).catch(err => {
		console.log("ERROR:", err.message);
	});
} else {
	mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
}

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret: "Once again Rusty wins the best dog award!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});
app.use(function(req,res,next){
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(PORT ,function() {
	console.log("Yelpcamp server started!!");
});