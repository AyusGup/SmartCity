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

const socket= io.connect("https://490bj8xz-8080.inc1.devtunnels.ms")

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
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/api",{
      method: "GET" ,
     })
     const result= await response.json();
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

   return(
     <div style={{display:"flex" , flexFlow:"wrap" , flexDirection:"column" , alignItems:"center" ,justifyContent:"space-evenly"}}>
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
                like={props.like}
                addComment={props.addComment}
                getComments={props.getComments}
              />
            );
          })}
        </div>
        <div id="chat">
          <div style={{height:"60px",width:"100%",backgroundColor:"#0D6EFD",borderRadius:'10px 10px 0px 0px',display:'flex',alignItems:'center'}}>
            <img src={bot} style={{float:"left",marginLeft:"5px"}}/>
            <h3 style={{marginLeft:'5px',color:"#fff"}}>Saheli</h3>
          </div>
          <ChatBot />
        </div>
        <div className="smallChat">
            {!showChatModal && <button  onClick={()=>setShowChatModal(true)} id="chatbotbutton">chat</button>}
            {showChatModal && <div id="smallChatArea">
              <div style={{height:"60px",width:"100%",backgroundColor:"#0D6EFD",borderRadius:'10px 10px 0px 0px',display:'flex',alignItems:'center'}}>
                <img src={bot} style={{float:"left",marginLeft:"5px"}}/>
                <h3 style={{marginLeft:'5px',color:"#fff"}}>Saheli</h3>
                <button onClick={()=>setShowChatModal(false)} style={{position:"absolute",right:"10px"}}>
                  cancel
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