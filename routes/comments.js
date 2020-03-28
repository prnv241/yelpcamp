var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var MiddleFun = require("../middleware/index");

router.get("/campgrounds/:id/comments/new", MiddleFun.isLoggedIn, function(req,res) {
	Campground.findById(req.params.id,function(err,campground) {
		if(err) {
			req.flash("error", "Something Went Wrong!");
			res.redirect("/campgrounds/" + req.params.id);
		} else {
			res.render("comments/new",{campground: campground});
		}
	});
});

router.post("/campgrounds/:id/comments", MiddleFun.isLoggedIn, function(req,res) {
	var ID = req.params.id;
	Campground.findById(ID, function(err,campground) {
		if(err) {
			req.flash("error", "Campground not Found!");
			res.redirect("/campgrounds");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err)  {
					req.flash("error", err.message);
					res.redirect("/campgrounds/" + req.params.id);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Comment added Successfully!")
					res.redirect("/campgrounds/" + ID);
				}
			});
		}
	});
});

router.get("/campgrounds/:id/comments/:comment_id/edit", MiddleFun.checkComntAuth, function(req,res){
	var ID = req.params.id;
	Campground.findById(ID, function(err,campground) {
		if(err) {
			req.flash("error", "Campground not Found!");
			res.redirect("/campgrounds");
		} else {
			Comment.findById(req.params.comment_id, function(err, comment){ 
				if(err)  {
					req.flash("error", err.message);
					res.redirect("/campgrounds/" + req.params.id);
				} else {
					res.render("comments/edit", {campground:campground, comment: comment});
				}
			});
		}
	});
});

router.put("/campgrounds/:id/comments/:comment_id", MiddleFun.checkComntAuth, function(req,res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,comm) {
		if(err) {
			req.flash("error", "Something Went Wrong!");
			res.redirect("/campgrounds/" + req.params.id);
		} else {
			req.flash("success", "Comment Edited Successfully!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

router.delete("/campgrounds/:id/comments/:comment_id", MiddleFun.checkComntAuth, function(req,res) {
	Comment.findByIdAndDelete(req.params.comment_id,function(err, comment){ 
		if(err)  {
			req.flash("error", err.message);
			res.redirect("/campgrounds/" + req.params.id);
		} else {
			req.flash("success", "Campground Deleted Successfully!");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;