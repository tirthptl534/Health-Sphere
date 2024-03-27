const mongoose = require('mongoose')

// const Schema = mongoose.Schema

// const AddPatientSchema = new Schema({
//     fname:{type:String , required:true},
//     mname:{type:String , required:true},
//     lname:{type:String , required:true},
//     email:{type:String , required:true},
//     age:{type:Number , required:true},
//     mobile:{type:String , required:true},
//     gender:{type:String,required:true},
//     bloodgroup:{type:String , required:true},
//     marriedstatus:{type:String , required:true},
//     address:{type:String , required:true},
//     height:{type:Number , required:true},
//     weight:{type:Number,required:true},
//     // date:{type:Date,required:true},
//     //status:{type:Number,default:1},
    
    

// }
// )
// const AddPatientLog = mongoose.model("addPatient", AddPatientSchema)
// module.exports = AddPatientLog

const AddPatient = new mongoose.Schema({
    
        fname:{type:String , required:true},
        mname:{type:String , required:true},
        lname:{type:String , required:true},
        email:{type:String , required:true},
        age:{type:Number , required:true},
        mobile:{type:String , required:true},
        gender:{type:String,required:true},
        bloodgroup:{type:String , required:true},
        marriedstatus:{type:String , required:true},
        address:{type:String , required:true},
        height:{type:Number , required:true},
        weight:{type:Number,required:true},
        status:{type:Number,default:1},
        birthdate:{type:Date,},
},{collection:"AddPatientData"})

const addPatientModel = mongoose.model("AddPatient",AddPatient)

module.exports = addPatientModel