import {Routes, Route, useNavigate} from 'react-router-dom';
import useState from "react";

function Item(props){
   
   return(
      <>
         <hr />
         <div style={{display:"flex",flexDirection:"column",width:"80vw",maxWidth:"800px",arginTop:"20px",backgroundColor:"#DCDCDC", padding:"30px", borderRadius:"10px"}}>
            <div style={{marginTop:"10px"}}>Date Of Complaint: {props.Date}</div>
            <div style={{marginTop:"10px"}}>Time Of Complaint: {props.Time}</div>
            <div style={{marginTop:"10px"}}>Problem:</div>
            <div style={{width:"100%"}}>{props.Problem}</div>
            <div style={{marginTop:"10px"}}>Seriousness:</div>
            <div style={{width:"100%"}}>{props.Seriousness}</div>
            <div style={{marginTop:"10px"}}>Complaint Description:</div>
            <div style={{width:"100%"}}>{props.Complaint}</div>
            
            <div style={{width:"100%", display:"flex", justifyContent:"space-around", flexWrap:"wrap",marginTop:"20px"}}>
                <div><button className="button" onClick={()=>{
                    const imageWindow = window.open('', 'ImageWindow');
                    imageWindow.document.write('<html><head><title>Image</title></head><body>');
                    imageWindow.document.write(`<img src="${props.Image}" alt="Base64 Image" />`);
                    imageWindow.document.write('</body></html>');
                    }}>view image</button></div>

                    <div><button className="button" onClick={()=>{
                    window.open(props.Location, '_blank')
                    }}>view location</button></div>

                    <div><button className="button" style={{backgroundColor:"red"}}>close</button></div>
            </div>
         </div>
      </>
   );
}

export default Item;