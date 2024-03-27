const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DoctorLoginSchema = new Schema({
    name:{type:String , required:true},
    speciality:{type:String,required:true},
    contact:{type:Number,required:true},
    email:{type:String , required:true,unique:true},
    password:{type:String,required:true},

},{collection:'DoctorLogin'}
)
const DocLog = mongoose.model('DoctorLoginData', DoctorLoginSchema)
module.exports = DocLog