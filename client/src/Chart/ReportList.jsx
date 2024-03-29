import Header from "./Header";
import Item from "./ListItem";
import Item2 from "./SmallScreen";
import { useState, useEffect } from "react";

function ReportList(){
    const [notes, setNotes] = useState([]);
    async function getReport(){
        const response= await fetch("https://citypulse.onrender.com/get/report",{
          method: "GET" ,
         })
         const result= await response.json();
         setNotes(result);
    }

    useEffect(()=>{
        getReport();
    },[])

    return(
        <>
            <Header />
            <div id="repo">
                <div style={{display:"flex",width:"100%",justifyContent:"space-around",marginTop:"20px",fontWeight:"bold"}}>
                    <div style={{width:"6vw",marginLeft:"50px"}}>Date</div>
                    <div style={{width:"4vw"}}>Time</div>
                    <div style={{width:"5vw"}}>Problem</div>
                    <div style={{width:"18vw",height:"auto"}}>Complaint</div>
                    <div style={{width:"2vw",marginRight:"10px"}}>Image</div>
                    <div style={{width:"2vw",marginRight:"40px"}}>Location</div>
                </div>
                {
                notes.map((noteItem, idx) => {
                return (
                <Item
                    key={noteItem._id}
                    index={idx}
                    id={noteItem._id}
                    Date={noteItem.createdAt.substring(0,9)}
                    Time={noteItem.timeOfIncident}
                    Problem={noteItem.problem}
                    Complaint={noteItem.complaint}
                    Location={`https://www.google.com/maps?q=${noteItem.latitude},${noteItem.longitude}&z=${17}`}
                    Image={noteItem.image}
                />
                );
            })
            }
            </div>
            <div id="repos">
            {
                notes.map((noteItem) => {
                return (
                    <Item2
                        key={noteItem._id}
                        id={noteItem._id}
                        Date={noteItem.createdAt.substring(0,9)}
                        Time={noteItem.timeOfIncident}
                        Problem={noteItem.problem}
                        Complaint={noteItem.complaint}
                        Location={`https://www.google.com/maps?q=${noteItem.latitude},${noteItem.longitude}&z=${17}`}
                        Image={noteItem.image}
                    />
                );
            })
            }
            </div>
        </>
    );
}

export default ReportList;