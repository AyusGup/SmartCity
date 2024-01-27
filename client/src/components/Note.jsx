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
  const [numberLike,setNumberLike] = useState(props.likes);
  const [currentLike,setCurrentLike] = useState(false);
  
  useEffect(() => {
    socket.on("recieve-comments", (data) => {
      getComments();
    })
  },[socket]);


  useEffect(() => {
      updateLikeOnServer();
  
  }, [numberLike]);

  async function updateLikeOnServer() {
    const response = await fetch('https://citypulse.onrender.com/api/updateLike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id: props.id, likes: numberLike }),
    });
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
}

function listenClick(){
  getComments();
  setFlag(true);
}

function increaselike(){
  if(currentLike===true) {
    setNumberLike(numberLike-1);
    setCurrentLike(!currentLike);
  }
  else if(currentLike===false) {
    setNumberLike(numberLike+1);
    setCurrentLike(!currentLike);
  }
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

      <div className="noteFooter">
        <div className='flex flex-wrap w-full'>
          <div className='mt-1'>
            <button
              style={{ color: 'black', height: '43px', display: 'flex' }}
              onClick={increaselike}
              id='thumbup'
            >
              <FontAwesomeIcon icon={faThumbsUp} className='text-[1.8rem] pr-2' />
              {numberLike}
            </button>
          </div>

          <form onSubmit={(e) => addComment(e)} className='flex w-[80%]'>
            <FloatingLabel controlId='floatingTextarea' label='Comments' className='mb-2 w-full mr-2'>
              <Form.Control as='textarea' placeholder='Leave a comment here' onClick={listenClick} />
            </FloatingLabel>
            <div className='mt-2'>
              <button style={{ borderRadius: '10px', width: 'fit-content' }} className='bg-blue-500'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='flex flex-col items-start w-[100%] mt-2'>
          {com.length && flag? com.map((noteItem, idx) => {
            if(idx<len){
              return (
                <div key={idx} style={{display:"flex"}}>
                  <Comment com={noteItem} getProfile={props.getProfile}/>
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
