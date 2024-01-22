const User = require("../models/User");
const {setUser,getUser} = require("../services/auth");
const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

const phone = ['+918826987071']

async function  handleLogin(req,res){
    const username = req.body.email
    const password = req.body.password

    try{
        var user = await User.findOne({email:username})
        if(!user){
        return res.redirect("/login")
        } else{
        user.comparePasswords(password, (err,match) =>  {
            if(!match){
            return res.redirect("/login")
            } else{
            const token = setUser(user)
            if(user.username === "Admin"){
                return res.status(300).json({
                    customToken: token,
                    valid: true,
                })
            }
            return res.status(200).json({
                customToken: token,
                valid: false,
            })
            }
        })
        }
    }catch(e){
        console.log(e);
    }
}

async function handleSignup(req,res){
    const user = new User({
        username:req.body.username,
        contact:req.body.contact,
        email:req.body.email,
        password:req.body.password,
        userImage:req.body.MyFile
    })
    
    user.save()
        .then((user) => {
        const token = setUser(user)
        return res.json({
            customToken: token,
            url: "/secret"
        })
        })
        .catch((error) => {
        return res.status(200).redirect("/signup")
        })
}

async function handleAuthentication(req,res){
    const tokenUser= getUser(req.body.userToken);
    if(tokenUser){
        const username = tokenUser.email
        try{
            var user = await User.findOne({email:username})
            if(!user){
            return res.redirect("/login")
            }
            else if(user.username === 'Admin'){
                return res.status(300).json({valid:true});
            }
            else if(tokenUser.username === 'Admin'){
                return res.status(300).send();
            } 
            else{
              return res.status(200).send();
            }
        } catch(e){
            console.log(e);
        }}
    return res.status(300).send();
}

function sendSms(phone, loc){
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_CODE);
    return client.messages
    .create({body:`Hey this is an emergency alert someone needs help location ${loc}`,from:'+15075744245', to: phone})
    .then((message)=>console.log(message))
    .catch((err)=>console.log(err))
}
async function handleSms(req,res){
    console.log(req.query.lat)
    const loc = `https://www.google.com/maps?q=${req.query.lat},${req.query.lng}&z=${17}`;
    phone.map((e)=>sendSms(e,loc));
    res.send("ok");
}

module.exports = {handleLogin ,handleSignup ,handleAuthentication, handleSms};

