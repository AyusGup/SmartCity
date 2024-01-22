import { useEffect, useState, useRef } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import Header from "./Header";
import socketIO from "socket.io-client";
import { UserData } from "./Data";
import { Problem } from "./problem";

//const problem=["Lighting issues","Harashment, Stocing, Abusement and Molestation Cases","Safety Concerns","Violence Report"];
//const year=[2023,2022,2021,2020,2019];

function Chart(props) {
  /*
  const socket=socketIO("https://490bj8xz-8080.inc1.devtunnels.ms/")
  const [temp1,setTemp1]=useState([0]);
  const [temp2,setTemp2]=useState([0]);
  useEffect(()=>{
    console.log("connected")
    socket.on("message1",(data)=>{
      console.log(data);
      setTemp2(data);
    })
    socket.on("message2",(data)=>{
      setTemp1(data);
    })
  },[])
*/
  const [data, setData] = useState([]);
  const caseReportData = useRef({});
  const yearReportData = useRef({});
  useEffect(()=>{
    getData();
  },[]);

  async function getData(){
    const response= await fetch("https://490bj8xz-8080.inc1.devtunnels.ms/get/count",{
      method: "GET" ,
    })
    const result = await response.json();
    setData(result.data);
  }

  console.log(data);
  
  yearReportData.current = {
    labels: data.yList,
    datasets: [
      {
        label: "Users Gained",
        data: data.ycount,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  /*problem?.pList?.map((e)=>{
      console.log(e)
      return e
    })*/
  caseReportData.current = {
    labels: data.pList,
    datasets: [
      {
        label: "Users Gained",
        data: data.pcount,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }


/*
  yearReportData.current ={
    labels: UserData.map((e)=>e.year),
    datasets: [
      {
        label: "Users Gained",
        data:UserData.map((e)=>e.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }
  
/*
  if(temp1.length){
    caseReportData.current ={
      labels: problem,
      datasets: [
        {
          label: "Users Gained",
          data: temp1.map((data) => data),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }
  }

  console.log(caseReportData);

 */
  // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT

  return (
    <>
      <Header logout={props.logout} />
      <div className="App">
        <div style={{ maxWidth: 1000 , minWidth: 300 , width:"80vw"}}>
          <BarChart chartData={caseReportData.current} />
          <div>Problem Complaints</div>
        </div>
        <div style={{ maxWidth: 1000 , minWidth: 300 , width:"80vw"}}>
          <LineChart chartData={yearReportData.current} />
          <div>Year-Wise Report Cases </div>
        </div>
      </div>
    </>
  );
}

export default Chart;