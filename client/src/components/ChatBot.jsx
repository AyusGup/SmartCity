import react, {useEffect, useState} from 'react';

function ChatBot(){
    const [data, setData]=useState([{answer:"Hello I am your Saheli and I'd be happy to assist you"}]);
    const [query,setQuery] = useState("");

    const fetchData = async()=>{
       const response = await fetch("https://490bj8xz-5000.inc1.devtunnels.ms/predict",{
         method:"POST",
         body:JSON.stringify({
            "message":query
         }),
         headers:{
            "Content-Type": "application/json",
          }
       })
       const res= await response.json();
       console.log(res);
       setData((prev)=>[...prev,res]);
       console.log(data);
    }
    return(
        // style={{display:"flex",flexFlow:"column",padding:"10px"}}
        <div id="main_chat">
            <div id="chat_area">
              {
                 data.map((e,idx)=>{
                      var flt= idx%2?"right":"left";
                      return(
                          <div key={idx} style={{textAlign:"left",marginBottom:"10px"}}>
                              <br />
                              <div style={{float:flt ,backgroundColor:"#90EE90",borderRadius:"10px 10px 10px 0px",padding:"7px",margin:"5px"}}>{e.answer}</div>
                          </div>
                      )
                  })
              }
            </div>
            <div id="send_chat">
            {/* style={{  position:"absolute", bottom:"0",alignSelf:"flex-end"}} */}
              {/* <div id="query"> */}
                  <input id="send_chat_input" placeholder='ask your question' onChange={(e)=>{
                     setQuery(e.target.value);
                  }} 
                      value={query}
                  />
                  {/* style={{borderRadius:"10px",float:"right"}} */}
                  <button id="send_chat_button"  onClick={(e)=>{
                      if(query === "") return
                      setData((prev)=>[...prev,{answer:query}])
                      fetchData()
                      setQuery("")
                  }} style={{backgroundColor:"#2166e0", color:"white"}}>submit</button>
              {/* </div> */}
            </div>
        </div>
    );
}

export default ChatBot;