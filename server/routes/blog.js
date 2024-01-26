const {hanadleMyPosts , handlePosts, handleUpdate,handleUpdateLike, handleComments, handleProfile, handleReport, handleRide, handleFindRide} = require("../controller/blogFunc");
const express= require("express");
const router= express.Router();

router.get("/",handlePosts);
router.post("/myPosts",hanadleMyPosts);
router.post("/update",handleUpdate);
router.get("/comment",handleComments);
router.post("/profile",handleProfile);
router.post("/report",handleReport);
router.post("/ride",handleRide);
router.post("/findRide",handleFindRide);
router.post("/updateLike",handleUpdateLike);
module.exports=router;