var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,g_xy_center,h_500,q_50,w_620,x_737,y_588/v1/clients/poconos/Campgrounds_Exterior_Keen_Lake_1_PoconoMtns_d606c492-eb33-450d-a725-e173b70c6cb8.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://www.sunset.com/wp-content/uploads/4_3_horizontal_inbody_900x506/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed campgrounds!");
    //     Comment.deleteMany({}, function(err) {
    //         if(err){
    //             console.log(err);
    //         }
    //         console.log("removed comments!");
    //          //add a few campgrounds
    //         data.forEach(function(seed){
    //             Campground.create(seed, function(err, campground){
    //                 if(err){
    //                     console.log(err)
    //                 } else {
    //                     console.log("added a campground");
    //                     //create a comment
    //                     Comment.create(
    //                         {
    //                             text: "This place is great, but I wish there was internet",
    //                             author: "Homer"
    //                         }, function(err, comment){
    //                             if(err){
    //                                 console.log(err);
    //                             } else {
    //                                 campground.comments.push(comment);
    //                                 campground.save();
    //                                 console.log("Created new comment");
    //                             }
    //                         });
    //                 }
    //             });
    //         });
    //     });
    }); 
    add a few comments
}
 
module.exports = seedDB;