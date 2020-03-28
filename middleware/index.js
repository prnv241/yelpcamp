var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleObj = {
	isLoggedIn: function(req,res,next) {
		if(req.isAuthenticated()) {
			return next();
		}
		req.flash("error", "Please Login First");
		res.redirect("/login");
	},
	
	checkCampAuth: function(req,res,next) {
		if(req.isAuthenticated()) {
			Campground.findById(req.params.id, function(err, campground) {
				if(err) {
					req.flash("error", "Campground not Found")
					res.redirect("/campgrounds");
				} else {
					if(campground.author.id.equals(req.user._id)) {
						next();
					}
					else {
						req.flash("error", "You dont have permission to do that!");
						res.redirect("/campgrounds/" + req.params.id);
					}
				}
			});
		} else {
			req.flash("error", "You need to be logged in first!")
			res.redirect("/login");
		}	
	},
	
	checkComntAuth: function(req,res,next) {
		if(req.isAuthenticated()) {
			Comment.findById(req.params.comment_id, function(err, comment) {
				if(err) {
					req.flash("error", "Comment not Found!");
					res.redirect("/campgrounds");
				} else {
					if(comment.author.id.equals(req.user._id)) {
						next();
					}
					else {
						req.flash("error", "You dont have permission to do that!");
						res.redirect("/campgrounds/" + req.params.id);
					}
				}
			});
		} else {
			req.flash("error", "You need to be logged in first!")
			res.redirect("/login");
		}	
	}
};

module.exports = middleObj;