const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ApplyLeaveSchema = new Schema({
    startdate:{type:Date , required:true},
    enddate:{type:Date , required:true},
    duration:{type:Number,required:true},
    reason:{type:String,required:true},
    approve:{type:Number,default:0},
    name:{type:String},
    email:{type:String}

},{collection:'AddLeaveSchema'}
)
const LeaveSchema= mongoose.model('AddLeaveSchema', ApplyLeaveSchema)
module.exports = LeaveSchema