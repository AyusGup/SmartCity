import {useState,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Userposts from "./userPosts";
import io from 'socket.io-client';
import PostHeader from "./PostHeader";
import avatar from '../user.png';
import ChatBot from "./ChatBot";
import bot from "../bot.png"
import logo1 from "./icons/logo1.png";
import RideForm from "./RideForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faComment } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from "react-hot-toast";
const socket= io.connect("https://citypulse.onrender.com")

function Secret(props){
  const [notes, setNotes] = useState([]);
  const [profile,setProfile] = useState({name:"" , contact:0 ,email:"" ,userImage:""});
  const [showChatModal,setShowChatModal] = useState(false);

  useEffect(()=>{
   getDB();
   getProfile();
  },[])
 
  async function getProfile(){
    const userProfile= await props.getProfile();
    setProfile({name:userProfile[0].username , contact:userProfile[0].contact , email:userProfile[0].email ,userImage:userProfile[0].userImage});
  }

  async function getDB(){
    const response= await fetch("https://citypulse.onrender.com/api",{
      method: "GET" ,
     }) 
     const result= await response.json();
     result.reverse();
     setNotes(result);
     
  }
  function addPost(Newnote){
    socket.emit("add-post" , {post:Newnote , userToken:localStorage.getItem("customToken")});
    getDB();
    /*
    socket.on("recieve-posts",(data)=>{
      /*
      setNotes(prev=>{
        return(
          [...prev,data.new]
        )
      });
    })
    */
  }
  const bodyStyles = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f1f1f1',
    /* For WebKit-based browsers (Chrome, Safari) */
    WebkitScrollbar: {
      width: '0px', /* You can adjust the width as needed */
    },
    WebkitScrollbarThumb: {
      backgroundColor: '#888', /* Color of the thumb */
      borderRadius: '4px', /* Rounded corners of the thumb */
    },
    WebkitScrollbarTrack: {
      backgroundColor: '#f1f1f1', /* Color of the track */
    },
  };

   return(
     <div style={{display:"flex" , flexFlow:"wrap" , flexDirection:"column" , alignItems:"center" ,justifyContent:"space-evenly"}}>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
	    <Header logout={props.logout}/>
      <div id="main">
        <div id="mainprofile">
          <div ><img  src= {profile.userImage === ""? avatar : profile.userImage} style={{alignSelf:"center",width:"150px" ,height:"150px" ,borderRadius:"50%"}}/></div>
          <div className="mainprofileblock">NAME: {profile.name}</div>
          <div className="mainprofileblock">PHONE NO.: {profile.contact}</div>
          <div className="mainprofileblock">EMAIL: {profile.email}</div>
        </div>
        <div id="blog">
          <PostHeader onAdd={addPost} image={profile.userImage}/>
          <hr/>
          {notes.map((noteItem) => {
              return (
              <Note
                key={noteItem._id}
                id={noteItem._id}
                userImage={noteItem.user_id.userImage}
                username={noteItem.user_id.username}
                title={noteItem.title}
                content={noteItem.content}
                postImage={noteItem.postImage}
                likes={noteItem.likes}
                addComment={props.addComment}
                getComments={props.getComments}
                getProfile={props.getProfile}
              />
            );
          })}
        </div>
        <div id="chat" style={bodyStyles}>
          {/* <div style={{height:"60px",width:"100%",backgroundColor:"#0D6EFD",borderRadius:'10px 10px 0px 0px',display:'flex',alignItems:'center'}}>
            <img src={bot} style={{float:"left",marginLeft:"5px"}}/>
            <h3 style={{marginLeft:'5px',color:"#fff"}}>Saheli</h3>
          </div> */}
          <RideForm/>
        </div>
        <div className="smallChat">
            {!showChatModal && <button  onClick={()=>setShowChatModal(true)} id="chatbotbutton">
            <img src={logo1} className="rounded-full h-16" />
            </button>}
            {showChatModal && <div id="smallChatArea">
              <div style={{height:"60px",width:"100%",backgroundColor:"#0D6EFD",borderRadius:'10px 10px 0px 0px',display:'flex',alignItems:'center'}}>
                <img src={bot} style={{float:"left",marginLeft:"5px"}}/>
                <h3 style={{marginLeft:'5px',color:"#fff"}}>Saheli</h3>
                <button onClick={()=>setShowChatModal(false)} className="absolute right-2 p-2 text-xs rounded-full">
                <FontAwesomeIcon icon={faTimes} size="2x" />
                </button>
              </div>
              <ChatBot />
            </div>}
        </div>
      </div>
      <Footer />
     </div>
   );
}

export default Secret;