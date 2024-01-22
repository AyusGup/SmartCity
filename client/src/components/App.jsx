import { useState,useEffect } from "react";
import {BrowserRouter ,Routes , Route, useNavigate} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Secret from "./Secret";
import Gif from "../ZZ5H.gif";
import io from 'socket.io-client';
import Profile from "./Profile";
import Report from "./Report"
import Chart from "../Chart/App";
import ReportList from "../Chart/ReportList";
import MapPage from '../components/MapPage';

const socket= io.connect("https://490bj8xz-8080.inc1.devtunnels.ms")

function Root() {
  const [isAuthorized,setAuthorized] = useState(-1);
  const [flag,setFlag] = useState(1);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    getPath();
  },[])

  async function addUser(Newnote){
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/signup",{
      method: "POST",
      body: JSON.stringify(Newnote) ,
      headers:{
        "Content-Type": "application/json",
        "customToken": window.localStorage.getItem("customToken")
      }
     })
     const res= await response.json();
     if(response.status===200){
      window.localStorage.setItem("customToken",(res).customToken)
      setAuthorized(1);
     } else{
      setAuthorized(0);
     }
     navigate(res.url);
  }

  async function checkUser(Newnote){
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/login",{
      method: "POST",
      body: JSON.stringify(Newnote) ,
      headers:{
        "Content-Type": "application/json",
        "customToken": window.localStorage.getItem("customToken")
      }
     })
     const res= await response.json();

     if(res.valid === true){
       console.log(res);
      window.localStorage.setItem("customToken",(res).customToken)
      setAuthorized(2);
     }
     else if(response.status === 200){
        window.localStorage.setItem("customToken",(res).customToken)
        setAuthorized(1);
     } else{
      document.getElementById("alert").innerHTML="*please enter valid email or password";
      setAuthorized(0);
     }
     navigate(res.url);
  }

  function removeSession(){
    localStorage.removeItem("customToken")
    console.log(localStorage.getItem("customToken"));
    setAuthorized(0);
    navigate("/")
  }

  async function getComments(id){
    console.log("getComments");
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/api/comment?id="+ id,{
      method: "GET" ,
     })
     const result= await response.json();
     return result;
  }

  async function getProfile(){
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/api/profile",{
      method: "POST" ,
      body: JSON.stringify({userToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
     const result= await response.json();
     return result;
  }

  async function sendOtp(id){
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/otpVerification?id="+ id,{
      method: "GET" ,
     })
     const result = await response.text();
     return result;
  }

  async function updateProfile(update){
    console.log(update);
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/api/update",{
      method: "POST",
      body: JSON.stringify({user:update , userToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
    })
  }
  async function updatePost(ele,val) {
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/api/update",{
      method: "POST" ,
      body: JSON.stringify({post:ele , val:val}) ,
      headers:{
        "Content-Type": "application/json"
      }
    })
  }

  async function addComment(Newnote){
    socket.emit("add-comment" , {comment:Newnote , userToken:localStorage.getItem("customToken")});
  }

  async function isAuthenticated(){
    console.log(localStorage.getItem("customToken"))
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/authenticate",{
      method: "POST" ,
      body: JSON.stringify({userToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })

     if(response.status === 300){
      setAuthorized(2);
     }
     else if(response.status === 200 ){
       setAuthorized(1);
     }
     else{
       setAuthorized(0);
     }
  }

  function getPath(){
    if(localStorage.getItem("customToken")){
      isAuthenticated();
    } else{
      setAuthorized(0);
    }
  }
  
  return (
    isAuthorized === -1?
      <div id="loading">
        <img src={Gif} id="loading-image"/>
      </div>
      :

      isAuthorized === 2?
      <Routes>
        <Route path="/" element={<Chart logout={removeSession} />}/>
        <Route path="/chart" element={<Chart logout={removeSession} />} />
        <Route path="/repo" element={<ReportList />} />
      </Routes>
      :
      <Routes>
        <Route path='/' element={isAuthorized === 1?<Secret logout={removeSession} like={updatePost} addComment={addComment} getComments={getComments} getProfile={getProfile} upDate={updateProfile} /> : <Login onCheck={checkUser}/>} />
        <Route path='/signup' element={isAuthorized === 1?<Secret logout={removeSession} like={updatePost} addComment={addComment} getComments={getComments} getProfile={getProfile} upDate={updateProfile} /> : <Signup onAdd={addUser} otp={sendOtp} />} />
        <Route path='/secret' element={isAuthorized === 1?<Secret logout={removeSession} like={updatePost} addComment={addComment} getComments={getComments} getProfile={getProfile} upDate={updateProfile} /> : <Login onCheck={checkUser}/>} />
        <Route path="/profile" element={<Profile getProfile={getProfile} upDate={updateProfile} logout={removeSession} like={updatePost} addComment={addComment} getComments={getComments}/>} />
        <Route path="/report" element={<Report />} />
        <Route path="/chart" element={<Chart logout={removeSession} />} />
        <Route path="/repo" element={<ReportList />} />
      </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;