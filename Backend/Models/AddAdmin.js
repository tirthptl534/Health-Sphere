const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AdminLoginSchema = new Schema({
    name:{type:String , required:true},
    
    email:{type:String , required:true,unique:true},
    password:{type:String,required:true},

},{collection:'AdminCredential'}
)
const AdminCredentialDetails= mongoose.model('AdminCredential', AdminLoginSchema)
module.exports = AdminCredentialDetails