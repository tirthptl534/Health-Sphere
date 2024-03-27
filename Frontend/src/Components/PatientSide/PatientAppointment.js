import React, { useState, useEffect } from "react";
import { Patientdata } from "./Patientdata";
import "../Dashboard/AdminDashboard.css";
import "../DoctorDashboard/MainDoctorDashboard.css";
import { Modal, ModalHeader } from "reactstrap";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Link } from "react-router-dom";
import axios from "axios"
import dayjs from 'dayjs';
import { message } from "antd";
import logo from "../../Assests/pending-icon.png"
import Logo from "../../Assests/LL.png"

function PatientAppointment() {
  function Logout (){
    window.location.href='/'
  }
  const [Pmodal, setPmodal] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setname] = useState();
  const [age, setage] = useState();
  const [gender, setgender] = useState();
  const [email, setemail] = useState();
  const [contact, setcontact] = useState();
  const [appreason, setappreason] = useState();
  const [date, setdate] = useState();
  const [time, settime] =  React.useState(dayjs());
  const [Appointment ,setAppointment] = useState([])
 
  const doctorname = localStorage.getItem("Dname");
  const doctoremail  = localStorage.getItem("Demail");
  const PatientEmail  = localStorage.getItem("Patientemail")

  const Femail = PatientEmail.slice(1, -1);

  const patientemail = localStorage.getItem("Patientemail")
  const PatientPassword = localStorage.getItem("PatientPassword")
  const Patientname = localStorage.getItem("Patientname")

  const SendAppointment = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1337/SendAppointment", {
        name,
        age,gender,contact,appreason,date,doctorname,doctoremail,time,email
      })
      .then((result) => {
        if (result.status === 201) {
          setModalOpen(false)
          alert('Your Appointment has been sent Successfully')
        } 
        
      })
      .then(window.location.reload())
      
      .catch((err) => console.log(err));
  };


  useEffect(()=> {

    async function asyncCall() {
    await axios.get('http://localhost:1337/AppointmentData')
    .then(result => {setAppointment(result.data.data.AllAppointmetnData); message.success("Appointments Fetched Successfully")})
    .catch(err => console.log(err))
    }
    
  
 asyncCall()
}, []);


    function Greeting(props){
      const currstatus = props.currstatus
      console.log(currstatus)
      if(currstatus === 0){
        return <td><img src={logo} alt="Logo" id="LPending" />Pending ....</td>
      }else if(currstatus === 1){
        return <td><i class="fa-solid fa-check" id="LApprove"></i>Approved</td>
      }else{
        return <td><i class="fa-solid fa-xmark" id="LDecline"></i>Rejected</td>
      }
    }
  return (
    <div>
      <div className="MainNavbar">
      <div><img src={Logo} alt="Logo" className="MMM" /></div>

         <div className="Sliding">
        <marquee className="MCol" direction="right">Welcome To  Union Family Health Center</marquee></div>
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
              <div className="AdminInfo">Account Type : Patient</div>
                <div className="AdminInfo">UserName : {Patientname.slice(1,-1)}</div>
                <div className="AdminInfo">Email :{patientemail.slice(1,-1)}</div>
                <div className="AdminInfo">Password : PatientPassword</div>
                <button className="LogOut" onClick={()=>Logout()}>Log Out</button>
              </div>
            </Modal>
            
            <i  onClick={() => {
                setPmodal(true);
              }} id="ProfilePic"class="fa-solid fa-circle-user"></i></div></div>
      <div className="MainBody">
        <div className="MainSidebar">
          <div className="SideBarData">
            {Patientdata.map((val, key) => {
              return (
                <div
                  key={key}
                  className="RowData"
                  id={window.location.pathname === val.link ? "active" : ""}
                  onClick={() => {
                    window.location.pathname = val.link;
                  }}
                >
                  <div>
                    <i class={val.icon} id="IconForSidebar"></i>
                  </div>{" "}
                  {val.title}
                </div>
              );
            })}
          </div>
        </div>

        <div className="MainData">
          <div className="NavBarForMainData">
            <i class="fa-sharp fa-solid fa-hospital" id="NavBarIcon"></i>
            <div className="NavDashboard">Dashboard</div>
            <div className="NavDashfeature">Dashboard Features</div>
          </div>

          <div>
            <Modal
              size="lg"
              isOpen={modalOpen}
              toggle={() => setModalOpen(!modalOpen)}
            >
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                Book Appointment For Doctor : {doctorname}-{doctoremail}
              </ModalHeader>
              <div>
                <form onSubmit={SendAppointment}>

                  <div className="Frow">
                    <div className="Fname">
                      <TextField
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        required
                        className="PC"
                      />
                    </div>
                    <div className="Fname">
                      <TextField
                        type="number"
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                        id="outlined-basic"
                        label="Age"
                        variant="outlined"
                        required
                        className="PC"
                      />{" "}
                    </div>
                  </div>
                  <div className="Srow">
                    <div className="Fname">
                      <TextField
                        type="number"
                        value={contact}
                        onChange={(e) => setcontact(e.target.value)}
                        id="outlined-basic"
                        label="Contact No."
                        variant="outlined"
                        required
                        className="PC"
                      />
                    </div>
                    <div className="Fname">
                      <TextField
                        type="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        required
                        className="PC"
                      />
                    </div>
                  </div>
                  <div className="Trow">
                    
                    <div className="Fname">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          required
                          className="PC"
                          label="Appointment Date"
                          value={date}
                          onChange={(newValue) => setdate(newValue)}
                        />{" "}
                      </LocalizationProvider>
                    </div>

                    <div className="Fname">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["TimePicker"]}>
                          <TimePicker 
                           className="PC" 
                           label="Pick Your Time For Appointment" 
                           value={time}
                            onChange={(newValue) => settime(newValue)}
                           
                           />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="Frow">
                  <div className="Fname">
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value={"Female"}
                          control={<Radio />}
                          label="Male"
                          onChange={(e) => {
                            setgender(e.target.value);
                            console.log(gender);
                          }}
                        />
                        <FormControlLabel
                          value={"Male"}
                          control={<Radio />}
                          label="Female"
                          onChange={(e) => {
                            setgender(e.target.value);
                            console.log(gender);
                          }}
                        />
                      </RadioGroup>
                    </div>
                    <div className="PCR">
                      <TextField
                        type="text"
                        value={appreason}
                        onChange={(e) => setappreason(e.target.value)}
                        id="outlined-basic"
                        label="Reason For Appointment"
                        variant="outlined"
                        required
                        className="PCR"
                      />
                    </div>
                  </div>

                  <div className="SubmitBtn">
                    <button type="submit" className="Sbtn">
                      Submit details
                    </button>
                  </div>


                  
                  <div className="PDoctor">Want Different Doctor ? 

                  <Link to={'/PatientDashboard'} className='Admin'>Click Here</Link>
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
              Book Appointment
            </button>

            <div>
               <table className="Ptable">
                <thead className="Thead">
                  <tr>
                    
                    <th>Sr No</th>
                    <th>Doctor Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Appointment?.filter(Appointment => Appointment.email === Femail).map((data, i) => (
                    <React.Fragment key={data._id}>
                    <tr key={i}>
                     
                      <td>{++i}</td>
                      <td>{data.doctorname}</td>
                      <td>{dayjs(data.date).format('DD/MM/YYYY')}</td>
                      <td>{dayjs(data.time).format('HH:MM')}</td>
                      <td>{data.appreason}</td>
                      <td><Greeting currstatus={data.status} /></td>
                    </tr>
                    
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

export default PatientAppointment;
