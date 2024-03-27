const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Appointment = new Schema({
    date:{type:Date,},
    time:{type:Date,},
    name:{type:String,required:true},
    age:{type:String,required:true,},
    gender:{type:Array,required:true},
    appreason:{type:String,required:true},
    appreason:{type:String,required:true},
    doctorname:{type:String,required:true},
    doctoremail:{type:String,required:true},
    status:{type:Number,default:0},
    email:{type:String},
    

},{collection:'Appointmentschema'}
)
const AppointmentSchema= mongoose.model('Appointmentschema', Appointment)
module.exports = AppointmentSchema