const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Prescription = new Schema({
    date:{type:Date,default: () => Date.now() + 7*24*60*60*1000},
    patientname:{type:String,required:true},
    patientemail:{type:String,required:true,},
    category:{type:String,required:true},
    medicine:{type:Array,required:true},
    description:{type:String,required:true},
    doctorname:{type:String,required:true},
    doctoremail:{type:String,required:true},
    

},{collection:'PrescriptionSchema'}
)
const PresSchema= mongoose.model('PrescriptionSchema', Prescription)
module.exports = PresSchema