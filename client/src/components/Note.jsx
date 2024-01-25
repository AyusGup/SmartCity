import {useEffect, useState} from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import io from 'socket.io-client';
import Comment from './Comment';
import avatar from '../user.png';

const socket= io.connect("https://citypulse.onrender.com")

function Note(props) {
  const [com,setCom] = useState([]);
  const [len,setLen] = useState(2);
  const [flag,setFlag] = useState(false);
  const [isLiked,setLike] = useState(false);
  const [like,setlike] = useState(false);
  /*
  for like only
  function handleClick() {
    const val= check?-1:1;
    props.like(props.val);
    setCheck(1);
  }
 */
useEffect(() => {
  socket.on("recieve-comments", (data) => {
    getComments();
  })
},[socket]);

function addComment(e){
   props.addComment({comment: e.target[0].value , post_id:props.id});
   e.target[0].value="";
   e.preventDefault();
   getComments();
}

async function getComments(){
  const comment= await props.getComments(props.id);
  console.log(comment);
  setCom(comment);
}

function incLen(){
  setLen(len+10<com.length?len+10:com.length)
}

function listenClick(){
  getComments();
  setFlag(true);
}

function increaselike(){
  if(like===true) setlike(false);
  else if(like===false) setlike(true);
}

  return (
    <div className="note">
      <div id="noteheader">
        <img src={props.userImage === ""?avatar : props.userImage} style={{float:"left",width:"30px",height:"30px",borderRadius:"50%",margin:"5px"}}/>
        <p style={{float:"left",margin:"10px",fontWeight:"bold", fontSize:"15px"}}>{props.username}</p>
      </div>
      <hr />
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {props.image!="" && <img src={props.postImage} />}
      <hr/>

      <div className="noteFooter" style={{ display: "flex", alignItems:"center"}}>
        <div>
          <button
            style={{ color: isLiked ? 'red' : 'black'}}
            onClick={increaselike}
          >
            <FontAwesomeIcon icon={faThumbsUp} className='text-[1.8rem] pr-2'/>
            {0}
          </button>
        </div>

        <div className='w-[81%]'>
          <form onSubmit={(e) => addComment(e)} className='flex ml-[-10px]'>
            <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-2" style={{ width: "80%", marginRight: "10px" }}>
              <Form.Control as="textarea" placeholder="Leave a comment here" onClick={listenClick} />
            </FloatingLabel>
            <div>
              <button style={{ borderRadius: "10px", width: "fit-content" }} className='mt-2 pt-8 bg-blue-500'>Submit</button>
            </div>
          </form>
          </div> 
        </div>
      <div className='flex flex-col items-start w-[100%] mt-2'>
          {com.length && flag? com.map((noteItem, idx) => {
            if(idx<len){
              return (
                <div key={idx} style={{display:"flex"}}>
                  <Comment com={noteItem} />
                </div>
                )
            }
            return (<></>)
          }) : <></>}
          {flag && com.length>0?<p onClick={incLen} className='w-100 text-center'>load more...</p> : <></>}
      </div>
    </div>
  );
}

export default Note;
