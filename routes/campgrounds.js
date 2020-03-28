var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var MiddleFun = require("../middleware/index");

router.get("/campgrounds",function(req,res) {
	Campground.find({}, function(err,allcampgrounds){
		if(err) {
			req.flash("error", "Something went Wrong!");
			res.redirect("/");
		}
		else {
			res.render("campgrounds/index", {campgrounds:allcampgrounds});
		}
	});
});

router.get("/campgrounds/new",MiddleFun.isLoggedIn, function(req,res) {
	res.render("campgrounds/new");
});

router.post("/campgrounds",MiddleFun.isLoggedIn, function(req,res) {
	var name = req.body.name;
	var img = req.body.image;
	var desc = req.body.desc;
	var price = req.body.price;
	var Author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCamp = {name: name, image: img, description: desc, price:price, author:Author};
	Campground.create(newCamp, function(err,newcamp) {
		if(err) {
			req.flash("error", err.message);
			res.redirect("/");
		}
		else {
			req.flash("success", "Campground Added Successfully!");
			res.redirect("/campgrounds");			
		}
	});
});

router.get("/campgrounds/:id", function(req, res) {
	var ID = req.params.id;
	Campground.findById(ID).populate("comments").exec(function(err,camp){
		if(err) {
			req.flash("error", err.message);
			res.redirect("/");
		}
		else {
			res.render("campgrounds/shows", {campground: camp});
		}
	});
});

router.get("/campgrounds/:id/edit", MiddleFun.checkCampAuth, function(req,res) {
	Campground.findById(req.params.id, function(err, camp) {
		if(err) { 
			req.flash("error", "Campground not found!");
			res.redirect("/campgrounds")
		}
		res.render("campgrounds/edit", {campground:camp});
	});
});

router.put("/campgrounds/:id", MiddleFun.checkCampAuth,function(req,res) {
	Campground.findByIdAndUpdate(req.params.id,req.body.camp, function(err,upcamp) {
		if(err) { 
			req.flash("error", "Campground not found!");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground Edited Successfully!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/campgrounds/:id",MiddleFun.checkCampAuth, function(req,res) {
	Campground.findByIdAndRemove(req.params.id,function(err,camp){
		if(err) {
			req.flash("error", "Campground not found!");
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Campground Deleted Successfully!");
			res.redirect("/campgrounds");
		}
	});
})

module.exports = router;