const Report = require("../models/Report");
const User = require("../models/User");

const problem=["Miscellaneous", "Accident", "Theft", "Robbery", "Violence", "Kidnapping", "Molestation", "Rape", "Murder", "Riot"];
const year = [];
const d = new Date();
let y = d.getFullYear();
for(let i =0;i<10;i++){
  year.push(y-i);
}
async function handleReport(req,res){
    // const filter = { flag: true };
    const reports= await Report.find();
    res.json(reports);
}
async function handleCount(req,res){
    let pdata = [];
    let ydata = [];
    for(let i=1;i<=10;i++){
        const data = await Report.count({problem: i.toString()});
        pdata.push(data);
    }
    for(let i=0;i<10;i++){
        const data = await Report.count( { createdAt: { $gt: new Date('01/01/'+year[i]) } } ) - await Report.count( { createdAt: { $gt: new Date('12/31/'+ year[i]) } } )
        ydata.push(data);
    }
    let obj = {};
    obj["pList"] = problem;
    obj["pcount"] = pdata;
    obj["yList"] = year;
    obj["ycount"] = ydata;
    res.json({data:obj});
}
module.exports = {handleReport, handleCount};
