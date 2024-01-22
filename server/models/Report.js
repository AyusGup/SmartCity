const mongoose = require("mongoose");
// problem, time of incident, latitude and longitude, feedback yeh chije daal dio -->
const reportModel = new mongoose.Schema({
    sender:{type: mongoose.Schema.Types.ObjectId , ref:"user"},
    problem:{type:String},
    seriousness:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    complaint:{type:String},
    timeOfIncident:{type:String},
    image:{type:String},
    approved:{type: String,default: false},
    flag:{type: String,default: true},
},{timestamps: true});

const Report = new mongoose.model("Report",reportModel);

module.exports = Report;