import {useEffect, useState ,useRef} from "react";
import avatar from '../user.png';
import Header from "./Header";
import Userposts from "./userPosts";
import Footer from "./Footer";
import io from 'socket.io-client';

const socket= io.connect("http://localhost:8080")

function Profile(props){
const clearIntervalRef = useRef();
const [profile,setProfile] = useState({name:"" , contact:0 ,email:"" ,userImage:""});
const [notes, setNotes] = useState([]);

useEffect(()=>{
    getProfile();
    getMyPosts();
},[])

async function getMyPosts(){
    console.log("getMyPosts");
    const response= await fetch("http://localhost:8080/api/myPosts",{
      method: "POST" ,
      body: JSON.stringify({userToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
     const result= await response.json();
     setNotes(result);
}

async function getProfile(){
    const userProfile= await props.getProfile();
    setProfile({name:userProfile[0].username , contact:userProfile[0].contact , email:userProfile[0].email ,userImage:userProfile[0].userImage});
}

function handleChange(event) {
const { name, value } = event.target;
setProfile(prevProfile => {
    return {
    ...prevProfile,
    [name]: value
    };
});
}

function handleSubmit(){
props.upDate(profile);
document.getElementById("message").style.display="block";
document.getElementById("message").innerHTML="profile updated successffully"
document.getElementById("message").style.backgroundColor="rgb(11, 200, 22)";
clearIntervalRef.current = setTimeout(()=>{
    document.getElementById("message").style.display="none";
}, 3000);
}

function deletePost(ele) {
    socket.emit("delete-post" , {post:ele});
    document.getElementById("message").style.display="block";
    document.getElementById("message").style.backgroundColor="#FF0000";
    document.getElementById("message").innerHTML="post deleted successffully"
    clearIntervalRef.current = setTimeout(()=>{
        document.getElementById("message").style.display="none";
    }, 3000);
    getMyPosts();
}
   return(
    <div style={{display:"flex" , flexFlow:"wrap" , flexDirection:"column" , alignItems:"center"}}>
      <Header logout={props.logout} />
      <div  id="message" className="alert" style={{top:"10%" ,right:"2%"}}></div>
      <div className='prompt' style={{display:"flex" ,flexDirection:"column" ,minWidth:"50%" }}>
          <h1 style={{textAlign:"center"}}>PROFILE</h1>
          <img src= {profile.userImage === ""? avatar : profile.userImage} style={{alignSelf:"center",width:"150px" ,height:"150px" ,borderRadius:"50%"}} />
          <div>
          <hr />
            <p>NAME:</p>
            <input value={profile.name} onChange={(e) => handleChange(e)} name="name"/>
          <hr />
          <p>EMAIL:</p>
            <p>{profile.email}</p>
          <hr />
          <p>CONTACT:</p>
            <input value={profile.contact} onChange={(e) => handleChange(e)} name="contact"/>
          </div>
          <hr />
          <button onClick={handleSubmit}>Update</button>
      </div>
      <div style={{fontSize:"20px",fontWeight:"bold"}}>My Posts</div>
      {notes.map((noteItem) => {
          return (
            <Userposts
              key={noteItem._id}
              id={noteItem._id}
              userImage={noteItem.user_id.userImage}
              username={noteItem.user_id.username}
              title={noteItem.title}
              content={noteItem.content}
              postImage={noteItem.postImage}
              onDelete={deletePost}
              addComment={props.addComment}
              getComments={props.getComments}
            />
          );
      })}
      <Footer />
    </div>
   );
}

export default Profile;