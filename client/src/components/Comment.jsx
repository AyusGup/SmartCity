import React from "react";
import avatar from "../user.png";

function Comment(props){
    return (
      <>
        
        <div id="comment_box">
          <img
            src={
              props.com.user_id.userImage === ""
                ? avatar
                : props.com.user_id.userImage
            }
            style={{
              float: "left",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginLeft: "20px",
            }}
          />
          <div
            id="people_comment"
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              marginLeft: "20px",
              alignItems: "flex-start",
            }}
          >
            <p style={{ fontWeight: "bold" }}>{props.com.user_id.username}</p>
            <p style={{ marginTop: "-10px" }}>{props.com.comment}</p>
          </div>
        </div>
      </>
    );
}

export default Comment;