const mongoose = require('mongoose')

const AddDoctor = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    address:{type:String,required:true},
    contact:{type:Number,required:true},
    email:{type:String,required:true},
    salary:{type:Number,required:true},
    speciality:{type:String,required:true},
    gender:{type:String,required:true},
    birthdate:{type:Date,required:true},
    status:{type:Number,default:0}
   
    

},{collection:"AddDoctorData"})



const AddDoctorModel = mongoose.model("AddDoctorData",AddDoctor)

module.exports = AddDoctorModel