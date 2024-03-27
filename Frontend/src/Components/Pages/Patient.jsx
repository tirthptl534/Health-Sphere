import React, {  useState, useEffect } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { Modal, ModalHeader } from "reactstrap";
import { TextField } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { NavLink ,useNavigate } from 'react-router-dom';
import "../Pages/Patient.css";
import "react-toastify/dist/ReactToastify.css";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {message} from "antd"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Logo from "../../Assests/LL.png"
import dayjs from "dayjs";

function Patient() {
  
  const [open, setOpen] = React.useState(false);
  const [detailshow , setdetailshow] = useState([])
	const navigate = useNavigate();
  const AddPatient = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:1337/addPatient",{fname,mname,lname,mobile,email,age,gender,bloodgroup,marriedstatus,address,birthdate,height,weight})
    .then(result =>{
      setModalOpen(false)
       const timer = setTimeout(()=>{
        if(result.data.status === 'Success'){
          message.success("Patient Added Successfully")
          

        }else{
          message.error("Error Occurred While Adding Patient")
        }
       },1000)
       return () => clearTimeout(timer);
           
            
          }
       
          ).then(window.location.reload(false))
    .catch(err => console.log(err))
 
    }

  useEffect(()=> {
         
      //  const response =  
      //                    fetch('http://localhost:1337/AllPatient');
      //  const alldata =  response.json();
      //  setAllPatient(alldata.data.AllPatientData);
      async function asyncCall() {
     await axios.get("http://localhost:1337/AllPatient")
     
      .then(result => {setAllPatient(result.data.data.AllPatientData); console.log(result.data.data.AllPatientData)})
      .catch(err => console.log(err))
      }
      
    
   asyncCall()
}, []);

  const deleteuser = (id) => {
    axios.delete('http://localhost:1337/DeletePatient/'+id)
    .then(window.location.reload())
    .then(res => {
      message.success('Deleted Successfully')
      const timer = setTimeout(()=>{
        // if(res.status === 204)
      },5000)
      return () => clearTimeout(timer)
    })
    .catch(err => {
            toast.error(err, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })
  }

  const toggleShown = username => {
    const shownstate = detailshow.slice();
    const index = shownstate.indexOf(username)
  
    if(index >= 0){
      shownstate.splice(index,1)
      setdetailshow(shownstate);
    }else{
      shownstate.push(username)
      setdetailshow(shownstate)
    }
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [Pmodal, setPmodal] = useState(false);
  const [fname, setfname] = useState("");
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
  const [Query, setQuery] = useState("");
  // const searchhandler = (data) => {
  //   return data.filter((AllPatient) => AllPatient.fname.toLowerCase().includes(Query))
  // }


  function Logout (){
    window.location.href='/'
  }
  return (
    <div>
      <div className="PMainNavbar">
        
         <div className="TL"> <img src={Logo} alt="Logo" className="PHM"/></div>
        <div className="Sliding">
        <marquee className="MCol" direction="right">Welcome To Union Family Health Center</marquee></div>
        <div>
          
          <Modal
              size="lg"
              isOpen={Pmodal}
              toggle={() => setPmodal(!Pmodal)}
            >
              <ModalHeader toggle={() => setPmodal(!Pmodal)}>
                Profile Page
              </ModalHeader>
              <div>
                <div className="AdminInfo">Account Type : Admin</div>
                <div className="AdminInfo">UserName : Admin</div>
                <div className="AdminInfo">Email : Admin@gmail.com</div>
                <div className="AdminInfo">Password : Admin</div>
                <button className="LogOut" onClick={()=>Logout()}>Log Out</button>
              </div>
            </Modal>
            
            <i  onClick={() => {
                setPmodal(true);
              }} id="ProfilePic" className="fa-solid fa-circle-user"></i></div></div>
      <div className="PMainBody">
        <div className="PMainSidebar">
          <div className="PSideBarData">
            {Dashboard.map((val, key) => {
              return (
                <div
                  key={key}
                  className="PRowData"
                  id={window.location.pathname === val.link ? "active" : ""}
                  onClick={() => {
                    window.location.pathname = val.link;
                  }}
                >
                  <div>
                    <i className={val.icon} id="PIconForSidebar"></i>
                  </div>{" "}
                  {val.title}
                </div>
              );
            })}
          </div>
        </div>

        <div className="PMainData">
          <div className="PNavBarForMainData">
            <i className="fa-sharp fa-solid fa-hospital" id="PNavBarIcon"></i>
            <div className="PNavDashboard">Patient</div>
            <div className="PNavDashfeature">Patient's Features</div>
          </div>
          <div>
            
            <div className="">
            
            {/* <div><input type="text" placeholder="search" onChange={(e) => setQuery(e.target.value)}></input></div> */}
            <div className="PSearch"><TextField  id="outlined-basic" label="Search Name" variant="outlined" onChange={(e) => setQuery(e.target.value)}/></div>
            
            
            <div className="PatientABtn">
              <Modal
              size="lg"
              isOpen={modalOpen}
              toggle={() => setModalOpen(!modalOpen)}
            >
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                Add Patient
              </ModalHeader>
              <div>
                <form onSubmit={AddPatient}>
                  <div className="Frow">
                    <div className="Fname">
                      <TextField
                        type="text"
                        value={fname}
                        onChange={(e) => setfname(e.target.value)}
                        id="outlined-basic"
                        label="First Name"
                        variant="outlined"
                        required
                      />
                    </div>
                    <div className="Fname">
                      <TextField
                        type="text"
                        value={mname}
                        onChange={(e) => setmname(e.target.value)}
                        id="outlined-basic"
                        label="Middle Name"
                        variant="outlined"
                        required
                      />{" "}
                    </div>
                    <div className="Fname">
                      {" "}
                      <TextField
                        type="text"
                        value={lname}
                        onChange={(e) => setlname(e.target.value)}
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        required
                      />
                    </div>
                  </div>
                  <div className="Srow">
                    <div className="Fname">
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
                        label="Contact No"
                        variant="outlined"
                        inputProps={{
                          maxLength: 10,
                          inputMode: "numeric",
                        }}
                      />{" "}
                    </div>
                    <div className="Fname">
                      <TextField
                        className="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        required
                      />{" "}
                    </div>
                  </div>
                  <div className="Trow">
                    <div className="Fname">
                      <TextField
                        type="text"
                        value={bloodgroup}
                        onChange={(e) => setbloodgroup(e.target.value)}
                        id="outlined-basic"
                        label="Blood Group"
                        variant="outlined"
                        required
                      />
                    </div>
                    <div className="Fname">
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
                        label="Weight"
                        variant="outlined"
                      />
                    </div>
                    <div className="Fname">
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
                        label="height"
                        variant="outlined"
                        required
                      />
                    </div>
                  </div>
                  <div className="Frow">
                    <div className="Fname">
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
                        label="Age"
                        variant="outlined"
                        required
                      />
                    </div>
                    <div className="Fname">
                      <TextField
                        className="Email"
                        type="text"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        id="outlined-basic"
                        label="Address"
                        required
                        variant="outlined"
                      />
                    </div>
                  </div>
                  <div className="Firow">
                    <div className="Fname">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          required
                          label="Birthday"
                          value={birthdate}
                          onChange={(newValue) => setbirthdate(newValue)}
                        />{" "}
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
                    <button type="submit" className="Sbtn">
                      Submit details
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
            <button
              className="AddPBtn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              {" "}
              Add Patient
            </button></div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
               <table className="Ptable" >
                <thead className="Thead">
                  <tr>
                    <th></th>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact</th>
                    <th>Current Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {AllPatient?.filter(AllPatient => AllPatient.fname.toLowerCase().includes(Query)).map((data, i) => (
                   
                    <React.Fragment key={data._id}>
                    <tr key={i}>
                     <td><IconButton
                        id="Iicon"
                        aria-label="expand row"
                        size="small"
                        onClick={() => {setOpen(!open); toggleShown(data.fname)} }
                      >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton></td>
                     
                      <td>{++i}</td>
                      <td>{data.fname}</td>
                      <td>{data.age}</td>
                      <td>{data.mobile}</td>
                      <td><div className="Active">Active</div></td>
                      <td className="Paction">
                        <div><NavLink to={`UpdatePatient/${data._id}`} ><i class="fa-solid fa-pen"></i></NavLink></div>
                        <div className="PDelete"><i class="fa-solid fa-trash" id="deleteicon" onClick={(e) => deleteuser(data._id)}></i></div>
                        </td>
                      
                    </tr>
                    {detailshow.includes(data.fname) && (
                        //   <tr className='Additional-info'>
                        //     {/* <div className='CData'> */}
                        //   <td><b>Name</b> : {data.fname}</td>
                         
                        //     {/* </div> */}
                        // </tr>


                        <div className="AddData">
                          <div className="M"><b>First Name  -  </b>  {data.fname}</div>
                          <div className="M"><b>Middle Name  -  </b>  {data.mname}</div>
                          <div className="M"><b>Last Name  -  </b>  {data.lname}</div>
                          <div className="M"><b>Email  -  </b>  {data.email}</div>
                          <div className="M"><b>Contact No  -  :</b>  {data.mobile}</div>
                          <div className="M"><b>Gender  -  </b>  {data.gender}</div>
                          <div className="M"><b>Birthdate  -  </b> {dayjs(data.birthdate).format('DD/MM/YYYY')} </div>
                          <div className="M"><b>Blood Group  -  </b>  {data.bloodgroup}</div>
                          <div className="M"><b>Marratrial Status  -  </b>  {data.marriedstatus}</div>
                          <div className="M"><b>Address  -  </b>  {data.address}</div>

</div>
                        
                      )}
                      </React.Fragment>
                  ))}
                </tbody>
              </table> 
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient;
