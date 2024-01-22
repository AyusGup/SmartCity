import {Routes, Route, useNavigate} from 'react-router-dom';
import useState from "react";

function Item(props){
   async function update(){
      console.log(props);
      const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/getData",{
        method: "POST",
        body: JSON.stringify({"approved":true,"key":props.id}) ,
        headers:{
          "Content-Type": "application/json",
        }
      })
      
   }
   
   return(
      <>
         <hr />
         <div style={{display:"flex",width:"100%",justifyContent:"space-around",backgroundColor:"#DCDCDC", padding:"30px", borderRadius:"10px"}}>
            <div style={{width:"8vw"}}>{props.Date}</div>
            <div style={{width:"2vw"}}>{props.Time}</div>
            <div style={{width:"5vw"}}>{props.Problem}</div>
            <div style={{width:"18vw"}}>
               <p className="long-text">{props.Complaint}</p>
               <button id="show-more" onClick={(e)=>{
                 let text = document.getElementsByClassName("long-text");
                 if(text[props.index].style.overflow === ""){
                     text[props.index].style.maxHeight = "95px";
                     text[props.index].style.overflow = "hidden";
                     e.target.innerHTML = "Show More";
                 }
                 if(text[props.index].style.overflow === "hidden"){
                     text[props.index].style.maxHeight = "fit-content";
                     text[props.index].style.overflow = "visible";
                     e.target.innerHTML = "Show Less";
                 }
                 else{
                     text[props.index].style.maxHeight = "95px";
                     text[props.index].style.overflow = "hidden";
                     e.target.innerHTML = "Show More";
                 }
               }}>Show More</button>
            </div>

            <div style={{width:"2vw"}}>{props.Seriousness}</div>
            <div style={{width:"2vw"}}><button className="button" onClick={()=>{

               const imageWindow = window.open('', 'ImageWindow');
               imageWindow.document.write('<html><head><title>Image</title></head><body>');
               imageWindow.document.write(`<img src="${props.Image}" alt="Base64 Image" />`);
               imageWindow.document.write('</body></html>');

            }}>view</button></div>
            <div style={{width:"2vw"}}><button className="button" onClick={()=>{
               window.open(props.Location, '_blank')
            }}>see</button></div>
            <div style={{width:"2vw"}}><button className="button" style={{backgroundColor:"red"}} onClick={update}>Approved</button></div>
            {/* <div style={{width:"2vw"}}><button className="button" style={{backgroundColor:"red"}} onClick={update(false)}>Close</button></div> */}
         </div>
      </>
   );
}

export default Item;