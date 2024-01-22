const {handleReport, handleCount} = require("../controller/adminFunc");
const express= require("express");
const router= express.Router();

router.get("/report",handleReport);
router.get("/count",handleCount);


module.exports=router;