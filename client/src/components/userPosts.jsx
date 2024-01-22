import {useState,useEffect} from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import io from 'socket.io-client';
import Comment from "./Comment";
import avatar from "../user.png";

const socket= io.connect("http://localhost:8080")

function Userposts(props) {
  const [len,setLen] = useState(1);
  const [com,setCom] = useState([]);
  const [flag,setFlag] = useState(false);

  useEffect(() => {
    socket.on("recieve-comments", (data) => {
      getComments();
    })
  },[socket]);

  function handleClick() {
    props.onDelete(props);
  }

  function addComment(e){
    props.addComment({comment: e.target[0].value , post_id:props.id});
    e.target[0].value="";
    e.preventDefault();
    getComments();
  }
 
  async function getComments(){
    const comment= await props.getComments(props.id);
    setCom(comment);
  }
  function incLen(){
    setLen(len+10<com.length?len+10:com.length)
    console.log(len);
  }
  function listenClick(){
    getComments();
    setFlag(true);
  }
  return (
    <div className="note" style={{width:"60%"}}>
      <div style={{marginBottom:"-20px"}}>
        <img src={props.userImage === ""?avatar : props.userImage} style={{float:"left",width:"50px",height:"50px",borderRadius:"50%",marginLeft:"20px"}}/>
        <p style={{float:"left",marginLeft:"20px",fontWeight:"bold"}}>{props.username}</p>
        <button onClick={handleClick} id="delete" style={{float:"right"}}>DELETE</button>
      </div>
      <hr />
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <img src={props.postImage} />
      <form onSubmit={(e)=> addComment(e)}>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" onClick={listenClick}/>
          </FloatingLabel>
          <button type="submit">Submit</button>
        </form>
        <div style={{display:"flex" , flexDirection:"column"}}>
        {
          flag && com ? com.map((noteItem, idx) => {
            if(idx<=len){
              return (
              <div key={idx} style={{display:"flex"}}>
                <Comment com={noteItem} />
              </div>
              )
            }
            return (<></>)
           }) : <></>}
        {flag && com.length>0?<p onClick={incLen} style={{textAlign:"center"}}>load more...</p> : <></>}
        </div>
    </div>
  );
}

export default Userposts;