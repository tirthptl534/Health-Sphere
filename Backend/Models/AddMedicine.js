const mongoose = require('mongoose')

const AddMedicine = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    expirydate:{type:Date,required:true},
    mfgdate:{type:Date,required:true},
    quantity:{ type : Number },
    price:{ type : Number },
    myFile : {type:String}
    

},{collection:"AddMedicineData"})



const AddMedicineModel = mongoose.model("AddMedicineData",AddMedicine)

module.exports = AddMedicineModel