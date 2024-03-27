import React,{useState,useEffect } from 'react'
import { TextField } from "@mui/material";
import { useParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import "./UpdatePatient.css"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { message } from 'antd';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

function UpdatePatient() {
  // const {updata, setUPdata} = useContext(updatedata)
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [fname, setfname] = useState();
  const [mname, setmname] = useState("");
  const [lname, setlname] = useState("");
  const [mobile, setmobile] = useState("");
  const [birthdate, setbirthdate] = React.useState();
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const [bloodgroup, setbloodgroup] = useState("");
  const [marriedstatus, setmarriedstatus] = useState("");
  const [address, setaddress] = useState("");
  const [height, setheight] = useState("");
  const [weight, setweight] = useState("");
  const [AllPatient, setAllPatient] = useState([]);

  const { id } = useParams("");
//   useEffect(()=> {
         
//     //  const response =  
//     //                    fetch('http://localhost:1337/AllPatient');
//     //  const alldata =  response.json();
//     //  setAllPatient(alldata.data.AllPatientData);
//     async function asyncCall() {
//       console.log(id)
//    await axios.get("http://localhost:1337/AllPatient")
   
//     .then(result => {setAllPatient(result.data.data.AllPatientData); console.log(AllPatient.map())})
//     .catch(err => console.log(err))
//     }
    
  
//  asyncCall()
// }, []);


const [inpval, setINP] = useState({
  fname: "",
  mname: "",
  lname: "",
  mobile: "",
  email: "",
  age: "",
  gender: "",
  bloodgroup: "",
  marriedstatus: "",
  address: "",
  birthdate: "",
  height: "",
  weight: ""
})
  


  // const UpdatePatient = async(e) =>{
  //   e.preventDefault();
  //   await axios.post("http://localhost:1337/UpdatePatientInfo",{fname,mname,lname,mobile,email,age,gender,bloodgroup,marriedstatus,address,birthdate,height,weight})
  //   .then(result =>{
      
  //      const timer = setTimeout(()=>{
  //       if(result.data.status === 'Success'){
  //         message.success("Patient Added Successfully")
          

  //       }else{
  //         message.error("Error Occurred While Adding Patient")
  //       }
  //      },1000)
  //      return () => clearTimeout(timer);
           
            
  //         }
       
  //         ).then(window.location.reload(false)).then( message.error("Error Occurred While Adding Patient"))
  //   .catch(err => console.log(err))
 
  //   }

    const UpdatePatient = async(e)=>{
      e.preventDefault();

      const {name,email,work,add,mobile,desc,age} = inpval;


      const res2 = await fetch(`http://localhost:1337/updateuser/${id}`,{
          method: "PATCH",
          headers: {
              "Content-Type": "application/json"
          },
          body:JSON.stringify({
            fname,mname,lname,mobile,email,age,gender,bloodgroup,marriedstatus,address,birthdate,height,weight
          })
      });

      const data2 = await res2.json();
      console.log(data2);

      if(res2.status === 422 || !data2){
          alert("fill the data");
      }else{
        message.success("Login Successfully")
        navigate('/Patient');
          
      }

  }

    const getdata = async () => {
      const res = await fetch(`http://localhost:1337/GetInfo/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
          setINP(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);

  return (
    <div>
      <div className='Upd'>Update Patient Details</div>
    <div className='UP'>
    <form onSubmit={UpdatePatient}>
                  <div className="Frow">
                  
                    <div className="Fname">
                    Fname
                      <TextField
                        type="text"
                        value={fname}
                        onChange={ 
                          (e)=>setfname(e.target.value)
                        
                      }
                      label={inpval.fname}
                      
                        id="outlined-basic"
                        name='name'
                        
                        variant="outlined"
                        required
                      />
                    </div>
                    <div className="Fname">

                      MName
                      <TextField
                        type="text"
                        value={mname}
                        onChange={(e) => setmname(e.target.value)}
                        id="outlined-basic"
                        label={inpval.mname}
                        variant="outlined"
                        required
                      />{" "}
                    </div>
                    Last Name :
                    <div className="Fname">
                      {" "}
                      <TextField
                        type="text"
                        value={lname}
                        onChange={(e) => setlname(e.target.value)}
                        id="outlined-basic"
                        label={inpval.lname}
                        variant="outlined"
                        required
                      />
                    </div>
                  </div>
                  <div className="Srow">
                    <div className="Fname">
                      Contact No :
                      <TextField
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^[0-9]+$/;
                          if (regex.test(value)) {
                            setmobile(value);
                          } else {
                            setmobile('');
                          }
                        }}
                        id="outlined-basic"
                        label={inpval.mobile}
                        variant="outlined"
                        inputProps={{
                          maxLength: 10,
                          inputMode: "numeric",
                        }}
                      />{" "}
                    </div>
                    <div className="Fname">
                      Email :
                      <TextField
                        className="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        id="outlined-basic"
                        label={inpval.email}
                        variant="outlined"
                        required
                      />{" "}
                    </div>
                  </div>
                  <div className="Trow">
                    <div className="Fname">
                      Blood Group :
                      <TextField
                        type="text"
                        value={bloodgroup}
                        onChange={(e) => setbloodgroup(e.target.value)}
                        id="outlined-basic"
                        label={inpval.bloodgroup}
                        variant="outlined"
                        required
                      />
                    </div>
                    <div className="Fname">
                      Weight :
                      <TextField
                        required
                        // type="number"
                        // value={height}
                        // onChange={(e) => setheight(e.target.value)}
                        // id="outlined-basic"
                        // label="Height"
                        // variant="outlined"
                        type="number"
                        value={weight}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value > 0) {
                            setweight(value);
                          }else if(value === '-'){
                            setweight('')
                          } 
                          else { 
                            setweight('');
                          }
                        }}
                        id="outlined-basic"
                        label={inpval.weight}
                        variant="outlined"
                      />
                    </div>
                    <div className="Fname">
                    height
                      <TextField
                        type="number"
                        value={height}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value > 0) {
                            setheight(value);
                          } else {
                            setheight('');
                          }
                        }}
                        id="outlined-basic"
                        label={inpval.height}
                        variant="outlined"
                        required
                      />
                    </div>
                  </div>
                  <div className="Frow">

                    <div className="Fname">
                    age
                      <TextField
                        type="number"
                        value={age}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value > 0) {
                            setage(value);
                          } else {
                            setage('');
                          }
                        }}
                        id="outlined-basic"
                        label={inpval.fname}
                        variant="outlined"
                        required
                      />
                    </div>
                    <div className="Fname">
                    address
                      <TextField
                        className="Email"
                        type="text"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        id="outlined-basic"
                        label={inpval.fname}
                       
                        required
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <div className="Firow">
                    <div className="Fname">
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          required
                          label="Birthday"
                          value={birthdate}
                          onChange={(newValue) => setbirthdate(newValue)}
                        />{" "}
                      </LocalizationProvider> */}


<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
        value={birthdate}
        label="Birthdate" 
        onChange={(newValue)=>setbirthdate(newValue)}
        
        />
      </DemoContainer>
    </LocalizationProvider>
                    </div>
                    <div className="Fname">
                      <div>Select Gender :</div>
                      <input
                        type="radio"
                        id="Gender"
                        name="Gender"
                        value={"Male"}
                        onChange={(e) => setgender(e.target.value)}
                        required
                      />
                      <label for="Gender">Male</label>
                      <br></br>
                      <input
                        type="radio"
                        id="Gender"
                        name="Gender"
                        value={"Female"}
                        onChange={(e) => setgender(e.target.value)}
                        required
                      />
                      <label for="Gender">Female</label>
                      <br></br>
                    </div>
                    <div className="Mname">
                      <div>Maratiral Status :</div>
                      <input
                        type="radio"
                        name="Maratrial"
                        value={"Married"}
                        onChange={(e) => setmarriedstatus(e.target.value)}
                        required
                      />
                      <label for="Gender">Unmarried</label>
                      <br></br>
                      <input
                        type="radio"
                        name="Maratrial"
                        value={"UnMarried"}
                        onChange={(e) => setmarriedstatus(e.target.value)}
                        required
                      />
                      <label for="Gender">Married</label>
                      <br></br>
                    </div>
                  </div>
                  <div className="SubmitBtn">
                    <button type="submit" className="Sbtn" id='UPBtn'>
                      Submit details
                    </button>
                  </div>
                </form>
                </div>
                </div>
  )
}

export default UpdatePatient





