const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CheckPatientCredential = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},

},{collection:'PatientCredential'}
)
const AddPatientCredential = mongoose.model('PatientCredential', CheckPatientCredential)
module.exports = AddPatientCredential