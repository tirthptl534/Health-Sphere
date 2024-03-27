import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios"
import { DoctorDashboard } from "../DoctorDashboard/DoctorDashboard";
import "../Dashboard/AdminDashboard.css";
import "../DoctorDashboard/MainDoctorDashboard.css";
import dayjs from 'dayjs';
import { Modal, ModalHeader } from "reactstrap";
import Logo from "../../Assests/LL.png"

function Appointment() {
  const [Appointment ,setAppointment] = useState([])
  const doctoremail  = localStorage.getItem("Doctoremail");
  const PatientEmail  = localStorage.getItem("Patientemail")
  const DoctorPass = localStorage.getItem("DoctorPassword")
  const DoctorName= localStorage.getItem("Doctorname")
  // const email = PatientEmail.slice(1,-1)
  const DE = doctoremail.slice(1,-1)
  const [Pmodal, setPmodal] = useState(false);

  const Update1 = async(id) => {
  const status = 1;
  
  await axios.post("http://localhost:1337/UpdateAppoin",{status,id})
  .then(result => {
    console.log(result)
  }).then(window.location.reload())
  .catch(err => console.log(err))
}
const Update2 = async(id) => {
  const status = 2
  console.log("HEreasd")
  await axios.post("http://localhost:1337/UpdateAppoin",{status,id})
  .then(result => {
    console.log(result)
  }).then(window.location.reload())
  .catch(err => console.log(err))
  
  }

  useEffect(()=> {

    async function asyncCall() {
    await axios.get('http://localhost:1337/AppointmentData')
    .then(result => {setAppointment(result.data.data.AllAppointmetnData); message.success("Appointments Fetched Successfully")})
    .catch(err => console.log(err))
    }
    
  
 asyncCall()
}, []);

function Logout (){
  window.location.href='/'
}
  return (
    <div>
      <div className="MainNavbar">
      <div><img src={Logo} alt="Logo" className="MMM" /></div>
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
                <div className="AdminInfo"><b>Account Type</b> : Doctor</div>
                <div className="AdminInfo"><b>UserName</b> :{DoctorName.slice(1,-1)}</div>
                <div className="AdminInfo"><b>Email</b> : {doctoremail.slice(1,-1)}</div>
                <div className="AdminInfo"><b>Password</b> : DoctorPassword</div>
                <button className="LogOut" onClick={()=>Logout()}>Log Out</button>
              </div>
            </Modal>
            
            <i  onClick={() => {
                setPmodal(true);
              }} id="ProfilePic"class="fa-solid fa-circle-user"></i></div></div>
      <div className="MainBody">
        <div className="MainSidebar">
          <div className="SideBarData">
            {DoctorDashboard.map((val, key) => {
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
            <i class="fa-solid fa-calendar-check" id="NavBarIcon"></i>
            <div className="NavDashboard">Appointment</div>
            <div className="AppFeature">Appointment Features</div>
          </div>
          

          <div>
          <table className="Ptable">
                <thead className="Thead">
                  <tr>
                    
                    <th>Sr No</th>
                    <th>Patient Name</th>
                    <th>Age</th>
                    <th className="G">Gender</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Appointment?.filter(Appointment => Appointment.doctoremail === DE).filter(Appointment => Appointment.status === 0).map((data, i) => (
                    <React.Fragment key={data._id}>
                    <tr key={i}>
                      <td>{++i}</td>
                      <td>{data.name}</td>
                      <td>{data.age}</td>
                      <td  className="G"> {data.gender}</td>
                      <td>{dayjs(data.date).format('DD/MM/YYYY')}</td>
                      <td>{dayjs(data.time).format('HH:MM')}</td>
                      <td>{data.appreason}</td>
                      <td><button className="DAPP" onClick={ () => Update1(data._id)} >Approve</button> <button className="DReject" onClick={ () => Update2(data._id)}>Reject</button></td>
                    </tr>
                    
                      </React.Fragment>
                  ))}
                </tbody>
              </table> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
