const express= require("express");
const {Parser} = require("json2csv");
const router= express.Router();
const Report = require("../models/Report");
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "../../ml-model/delhi_data.csv");
const moment = require("moment");

const filter = { approved: true };
const parserObj = new Parser();

router.post("/",async (req,res)=>{
    try{
       console.log("hi ia ma called");
        const {latitude, longitude,timeOfIncident, problem} = req.body.data;
        const formattedTime = moment(timeOfIncident, "HH:mm").format("hh:mm:ss A");
        const data={
            latitude,
            longitude,
            formattedTime,
            problem,
        }
        console.log(req.body);

    // }
    if(data){
        const csv =  parserObj.parse(data);
        fs.appendFileSync(filePath, Object.values(data).join(',') + '\n');
        console.log("data added sucess");
    }    
    res.json(data);
}
catch(e){
    console.log("in data routes api problem",e);
}
});
module.exports=router;