const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const DocLog = require('./Models/DoctorLoginSchema')
// const AddPatientLog = require('./Models/AddPatient')
const addPatientModel = require('./Models/AddPatient')
mongoose.connect("mongodb://0.0.0.0:27017/SGP",{
    useNewUrlParser: true,
    useUnifiedTopology: true,   
})
.then(console.log("Connected to database"))

const jwt = require('jsonwebtoken')
const PresSchema = require('./Models/AddPrescription')
const AddMedicineModel = require('./Models/AddMedicine')
const AddDoctorModel = require('./Models/AddDoctor')
const AdminCredentialDetails = require('./Models/AddAdmin')
const LeaveSchema = require('./Models/AddLeave')
const AddPatientCredential = require('./Models/AddPatientCredential')
const AppointmentSchema = require('./Models/AddAppointment') 
const AddEmployeeModel = require('./Models/AddEmployee')
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(cors())
app.use(express.json())

app.post('/api/register' , async(req , res) => {
    console.log(req.body)
    try{
        const user = await DocLog.create({
            name:req.body.name,
            speciality:req.body.speciality,
            contact : req.body.contact,
            email:req.body.email,
            password:req.body.password 
        })
        res.json({status:'ok'})
    }catch(err){
        res.json({status:'error',error:'Duplicate Email'})
    }
    
})


app.post('/api/login' , async(req , res) => {
    
        const user = await DocLog.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(user){
            const token = jwt.sign({
                name:user.name,
                email:user.email
            },
            'secret123'
            )
            return res.json({status:'ok',user:token,email:user.email,name:user.name,_id:user._id})
        }else{
            return res.json({status:'error',user:false})
        }
        
})


app.post('/api/Adminlogin' , async(req , res) => {
    
    const user = await AdminCredentialDetails.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if(user){
        const token = jwt.sign({
            name:user.name,
            email:user.email
        },
        'secret123'
        )
        res.cookie
        return res.json({status:'ok',user:token})
    }else{
        return res.json({status:'error',user:false})
    }
    
})


app.get('/AllPatient', async (req,res) => {
    
    const AllPatientData = await addPatientModel.find({})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                AllPatientData
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})


// app.get('/AllPatientData/:id', async (req,res) => {
    
//     let id = req.params.id;
//     // const AllPatientData = await addPatientModel.findById({})
//     // try{
//     //     res.status(200).json({
//     //         status : 'ok',
//     //         data : {
//     //             AllPatientData
//     //         }
//     //     })
//     // }catch(err){
//     //     res.status(500).json({
//     //         status: 'err',
//     //         message : err
//     //     })
//     // }

//         addPatientModel.findById(id, function (err, employee) {
//         res.json(employee);})


        
// })





app.post('/addPatient', async(req,res) => {
    const {email} = req.body
    // const patientdata = new addPatientModel(req.body)
    // try{
    //     await patientdata.save()
    //     res.status(201).json({
    //         status: 'Success',
    //         data : {
    //             patientdata
    //         }
    //     })
    // }catch(err){
    //     res.status(500).json({
    //         status: 'Failed',
    //         message : err
    //     })
    // }

    addPatientModel.findOne({email:email})
    .then(user => {
        if(user) {res.status(205).json({
            status:'err',
            message:'Email Already exists'
        })}
        else{
            const patientdata = new addPatientModel(req.body)
             patientdata.save()
             res.status(201).json({
                status: 'Success',
                data : {
                    patientdata
                }
            })
        }

    })
})


app.delete('/DeletePatient/:id', async(req,res) => {
    await addPatientModel.findByIdAndDelete(req.params.id)
    
    try{
       res.status(204).json({
          status : 'ok',
          data : "Patient Deleted Successfully"
      })
    }catch(err){
         res.status(500).json({
            status: 'error',
            message : err
        })
    }
})


app.delete('/DeleteEmployee/:id', async(req,res) => {
    await AddEmployeeModel.findByIdAndDelete(req.params.id)
    
    try{
       res.status(204).json({
          status : 'ok',
          data : "Patient Deleted Successfully"
      })
    }catch(err){
         res.status(500).json({
            status: 'error',
            message : err
        })
    }
})

//Fetching Medicine
app.get('/AllMedicine', async (req,res) => {
    const AllMedicine = await AddMedicineModel.find({})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                AllMedicine
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})


//Adding Medicine
app.post('/AddMedicineData', async(req,res) => {
    const {name} = req.body
    AddMedicineModel.findOne({name:name})
    .then(user => {
        if(user) {res.status(205).json({
            status:'err',
            message:'Medicine Already exists'
        })}
        else{
            const MedicineData = new AddMedicineModel(req.body)
            MedicineData.save()
             res.status(201).json({
                status: 'Success',
                data : {
                    MedicineData
                }
            })
        }

    })
})


//Deleting Medicine
app.delete('/DeleteMedicine/:id', async(req,res) => {
    await AddMedicineModel.findByIdAndDelete(req.params.id)
    
    try{
       res.status(204).json({
          status : 'ok',
          data : "Medicine Deleted Successfully"
      })
    }catch(err){
         res.status(500).json({
            status: 'error',
            message : err
        })
    }
})



app.get('/AllDoctor', async (req,res) => {
    const AllDoctorData = await AddDoctorModel.find({})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                AllDoctorData
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})




app.post('/AddDoctor', async(req,res) => {
    const {email} = req.body
    // const patientdata = new addPatientModel(req.body)
    // try{
    //     await patientdata.save()
    //     res.status(201).json({
    //         status: 'Success',
    //         data : {
    //             patientdata
    //         }
    //     })
    // }catch(err){
    //     res.status(500).json({
    //         status: 'Failed',
    //         message : err
    //     })
    // }

    AddDoctorModel.findOne({email:email})
    .then(user => {
        if(user) {res.status(205).json({
            status:'err',
            message:'Doctor Already exists'
        })}
        else{
            const Doctordata = new AddDoctorModel(req.body)
            Doctordata.save()
             res.status(201).json({
                status: 'Success',
                data : {
                    Doctordata
                }
            })
        }

    })
})


app.delete('/DeleteDoctor/:id', async(req,res) => {
    await AddDoctorModel.findByIdAndDelete(req.params.id)
    
    try{
       res.status(204).json({
          status : 'ok',
          data : "Doctor Deleted Successfully"
      })
    }catch(err){
         res.status(500).json({
            status: 'error',
            message : err
        })
    }
})

app.put('/UpdateStatus',async(req,res)=>{
    const userEmail = req.body.email
    const withoutFirstAndLast = userEmail.slice(1, -1);
    console.log(userEmail)
    console.log(req.body.status)
    // const result = await AddDoctorModel.findOneAndUpdate({email:userEmail},{$set:{status:req.body.value}})
    AddDoctorModel.updateOne({email:withoutFirstAndLast},{$set:{status:req.body.status}})
    .then (result => res.send(result))
    .catch(err => console.log(err))
    
    
    
    // AddDoctorModel.findByIdAndUpdate({_id:req.body.id},{email:"abc@gmail.com"})
    // .then(user=>res.json(user))
})


app.post('/AddLeave',async(req,res) => {
    const leave = new LeaveSchema(req.body)
    leave.save()
    res.status(201).json({
        status: 'Success',
        data : {
            leave
        }
    })
})

app.get('/LeaveApp', async (req,res) => {
    const LeaveApplication = await LeaveSchema.find({})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                LeaveApplication
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})

app.get('/AllPatientNameEmail', async(req,res)=>{
    const AllPatientNameEmail = await addPatientModel.find({},{fname:1,email:1,_id:0})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                AllPatientNameEmail
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})



app.get('/AllMedicineData',async(req,res)=>{
    const AllMedicineData = await AddMedicineModel.find({},{name:1,category:1,_id:0})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                AllMedicineData
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})

app.post('/api/Patientregister' , async(req , res) => {
    
    try{
        const user = await AddPatientCredential.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password 
        })
        res.json({status:'ok'})
    }catch(err){
        res.json({status:'error',error:'Email Already Exists'})
    }
    
})



app.post('/CheckCredlogin' , async(req , res) => {
    
    const user = await AddPatientCredential.findOne({
        email:req.body.email,
        password:req.body.password
    })
    if(user){
        const token = jwt.sign({
            name:user.name,
            email:user.email
        },
        'secret123'
        )
        return res.json({status:'ok',email:user.email,_id:user._id,name:user.name})
    }else{
        return res.json({status:'error',user:false})
    }
    
})

app.get('/PrescriptionData' , async(req,res)=>{
    const AllPrescriptionData = await PresSchema.find({})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                AllPrescriptionData
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})


app.post('/SendPrescription' , async(req , res) => {
    
    // try{
    //     const user = await PresSchema.create({
    //         name:req.body.patientname,
    //         email:req.body.patientemail,
    //         category:req.body.category,
    //         medicine:req.body.medicine,
    //         description:req.body.description, 
    //     })
    //     res.json({status:'ok'})
    // }catch(err){
    //     res.json({status:'error',error:'Email Already Exists'})
    // }
    
   
    
        
        
            const PrescriptionDataa = new PresSchema(req.body)
            PrescriptionDataa.save()
             res.status(201).json({
                status: 'Success',
                data : {
                    PrescriptionDataa
                }
            })
    
})


app.post('/SendAppointment' , async(req , res) => {
    
    // try{
    //     const user = await PresSchema.create({
    //         name:req.body.patientname,
    //         email:req.body.patientemail,
    //         category:req.body.category,
    //         medicine:req.body.medicine,
    //         description:req.body.description, 
    //     })
    //     res.json({status:'ok'})
    // }catch(err){
    //     res.json({status:'error',error:'Email Already Exists'})
    // }
    
   
    
        
        
            const AppointmentData = new AppointmentSchema(req.body)
            AppointmentData.save()
             res.status(201).json({
                status: 'Success',
                data : {
                    AppointmentData
                }
            })
    
})


app.get('/AppointmentData' , async(req,res)=>{
    const AllAppointmetnData = await AppointmentSchema.find({})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                AllAppointmetnData
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})


app.post('/UpdateAppoin' , async(req,res) => {
    
    const user = AppointmentSchema.findOne({_id:req.body.id})
    if(user){
    AppointmentSchema.updateOne({_id:req.body.id},{$set:{status:req.body.status}})
    .then (result => res.send(result))
    .catch(err => console.log(err))
    }else{
        res.send("No U")
    }
})



app.get('/GetLeave', async (req,res) => {
    const GetLeave = await LeaveSchema.find({})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                GetLeave
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})

app.post('/UpdateLeave' , async(req,res) => {
   LeaveSchema.updateOne({email:req.body.email},{$set:{approve:req.body.status}})
    .then (result => res.send(result))
    .catch(err => console.log(err))
   
})

app.post('/AddEmployee' , async(req , res) => {
    
    // try{
    //     const user = await PresSchema.create({
    //         name:req.body.patientname,
    //         email:req.body.patientemail,
    //         category:req.body.category,
    //         medicine:req.body.medicine,
    //         description:req.body.description, 
    //     })
    //     res.json({status:'ok'})
    // }catch(err){
    //     res.json({status:'error',error:'Email Already Exists'})
    // }
    
   
    
        
        
            const EmployeeData = new AddEmployeeModel(req.body)
            EmployeeData.save()
             res.status(201).json({
                status: 'Success',
                data : {
                    EmployeeData
                }
            })
    
})


app.get('/AllEmployee', async (req,res) => {
    
    const AllEmployeeData = await AddEmployeeModel.find({})
    try{
        res.status(200).json({
            status : 'ok',
            data : {
                AllEmployeeData
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'err',
            message : err
        })
    }
})

app.get("/GetInfo/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await addPatientModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})
app.get("/GetInfoDoctor/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await AddDoctorModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})
app.get("/GetInfoEmployee/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await AddEmployeeModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

app.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await addPatientModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})
app.patch("/updateEmployee/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await AddEmployeeModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})
app.patch("/updateDoctor/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await AddDoctorModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})



app.listen(1337 , () => {
    console.log('Port 1337')
})