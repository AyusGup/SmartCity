const express= require("express");
const router= express.Router();
const {handleLogin , handleSignup , handleAuthentication, handleSms}= require("../controller/user");

//router.get("/",(req,res) => {
  //  res.redirect("/login");

  
router.route("/login")
.get((req,res) => {
    res.status(300).json({url: "/",
    valid: false,});
})
.post(handleLogin);

router.route("/signup")
.get((req,res) => {
res.status(300).json({url: "/signup"});
})
.post(handleSignup);

router.post("/authenticate",handleAuthentication);

router.route("/sms")
.get(handleSms)


module.exports=router;