import React,{useState} from "react";
import avatar from '../user.png';
import CreateArea from "../components/CreateArea";
 
function PostHeader(props){
    const [showmodal,setShowModal]= useState(false);

    const closeModal = ()=>{
        return setShowModal(false);
    }
    
    return(
    <div className="postheader">
        <img src={props.image === ""? avatar : props.image} style={{float:"left",width:"50px",height:"50px",borderRadius:"50%",marginLeft:"20px"}}/>
        <button onClick={()=>setShowModal(true)} id="startapost">Start a post</button>
        {showmodal && <CreateArea closeModal={closeModal} onAdd={props.onAdd}/>}
    </div>
    );
}

export default PostHeader;