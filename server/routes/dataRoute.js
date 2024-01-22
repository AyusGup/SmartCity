const express= require("express");
const {Parser} = require("json2csv");
const router= express.Router();
const Report = require("../models/Report");
const fs = require('fs');
const filePath = "../Mapping/Data.csv";


const filter = { approved: true };
const parserObj = new Parser();

router.post("/",async (req,res)=>{
    try{
       
        const reports= await Report.findOneAndUpdate({_id:req.body.key},{approved:req.body.approved,flag:"false"});
    // const reports= await Report.find(filter);
      console.log(reports);
    
    // for(let i=0;i<reports.length;i++){
        const data={
            Latitude:reports.latitude,
            Longitude:reports.longitude,
            Time:reports.timeOfIncident,
        }
    

    // }
    if(data){
        const csv =  parserObj.parse(data);
        console.log(csv);
        fs.appendFileSync(filePath, csv);
    }    
    res.json(data);
}
catch(e){
    console.log("in data routes api problem",e);
}
});
module.exports=router;