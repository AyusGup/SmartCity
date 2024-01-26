const User = require("../models/User");
const blog = require("../models/Blog");
const comment = require("../models/Comment");
const Report = require("../models/Report");
const {getUser} = require("../services/auth");

const handleReport = async (req,res)=>{
    //const {time,text,ComplaintCases,latitude,longitude} = req.body;
    const userReport = new Report({
        latitude:req.body.data.latitude,
        longitude:req.body.data.longitude,
        problem:req.body.data.problem,
        complaint:req.body.data.desc,
        timeOfIncident:req.body.data.time,
        image:req.body.data.file,
        sender: req.body.customToken? getUser(req.body.customToken)._id : ""
    });
    
    userReport.save()
        .then(async (user) => {
            console.log("hi blog function");
            await fetch("https://citypulse.onrender.com/getData",{
            method: "POST",
            body: JSON.stringify({data: userReport}) ,
            headers:{
                "Content-Type": "application/json",
            }
            })
            return res.status(200).json({message:"success", url:"/secret",userReport});
        })
        .catch((error) => {
        return res.status(300).json({message:"failed", url:"/report"});
        })
}

async function hanadleMyPosts(req,res){
    const blogs= await blog.find({user_id: getUser(req.body.userToken)._id}).populate('user_id');
    res.json(blogs);
}

async function handlePosts(req,res){
    const blogs= await blog.find().populate('user_id');
    res.json(blogs);
}

async function handleUpdate(req,res){
    const id= getUser(req.body.userToken)._id;
    const del= await User.findOneAndUpdate({_id: id},{username:req.body.user.name , contact:req.body.user.contact});
    res.json(id);
}

async function handleRide(req, res) {
    try {
        const { userToken, start, destination, startTime } = req.body;
        if (!userToken || !start || !destination || !startTime) {
            return res.status(400).json({ error: 'Missing required fields in the request body.' });
        }
        console.log(getUser(userToken));
        const id = getUser(userToken)._id;

        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const updatedUser = await User.findOneAndUpdate({ _id: id }, { start, destination, startTime }, { new: true });

        console.log(`User with ID ${id} updated ride information.`);

        res.status(200).json({ message: 'Ride information updated successfully.', user: updatedUser });
    } catch (err) {
        
        console.error('Error in handleRide:', err);

        res.status(500).json({ error: 'Internal server error.' });
    }
}

async function handleFindRide(req, res) {
    try {
        const { userToken } = req.body;
        if (!userToken) {
            return res.status(400).json({ error: 'Missing required fields in the request body.' });
        }
        const id = getUser(userToken)._id;
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (!user.start || !user.destination || !user.startTime) {
            return res.status(400).json({ error: 'User must fill start, destination, and startTime fields first.' });
        }
        const matchingUsers = await User.find({
            _id: { $ne: id },
            start: user.start,
            destination: user.destination,
            startTime: user.startTime
        });
        console.log(`Matching users for user with ID ${id}:`, matchingUsers);
        res.status(200).json({ message: 'Matching users found successfully.', matchingUsers });
    } catch (err) {
        console.error('Error in handleFindRide:', err);

        res.status(500).json({ error: 'Internal server error.' });
    }
}


async function handleComments(req,res){
    const comments= await comment.find({post_id: req.query.id}).populate('user_id');
    res.json(comments);
}

async function handleProfile(req,res){
    const profile=await User.find({_id: getUser(req.body.userToken)._id});
    res.json(profile);
}

async function handleAddcomment(data){
    const userComment= new comment();
    userComment.user_id = getUser(data.userToken)._id;
    userComment.post_id = data.comment.post_id;
    userComment.comment = data.comment.comment;
    const save= await userComment.save();
}

async function handleDeletePost(data){
    await comment.deleteMany({post_id: data.post.id});
    const del= await blog.findOneAndDelete({_id: data.post.id});
}

async function handleAddPost(data){
    const user= new blog();
    user.user_id = getUser(data.userToken)._id;
    user.title = data.post.title;
    user.content = data.post.content;
    user.postImage = data.post.myFile;
    user.likes = 0;
    const save= await user.save();
}

async function handleUpdateLike(req,res){
    const { _id , likes } = req.body;
    
    const del= await blog.findOneAndUpdate({_id: _id},{likes: likes});
    console.log(del);
    res.json(del);
}

module.exports= {hanadleMyPosts , handleUpdateLike, handlePosts, handleUpdate, handleComments, handleProfile, handleAddcomment, handleDeletePost, handleAddPost, handleReport, handleFindRide, handleRide};

