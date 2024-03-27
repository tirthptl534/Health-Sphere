import React, { useEffect, useState } from 'react'
import "../Dashboard/AdminDashboard.css";
import "../DoctorDashboard/MainDoctorDashboard.css";
import axios from "axios"
import { Patientdata } from './Patientdata';
import "./PatientDashboard.css"
import image from "../../Assests/OQ6UTW0.jpg"
import {Link} from "react-router-dom"
import { Modal, ModalHeader } from "reactstrap";
import Logo from "../../Assests/LL.png"

function PatientDashboard() {
  // eslint-disable-next-line
  const [Pmodal, setPmodal] = useState(false);
  function Logout (){
    window.location.href='/'
  }
  const PatientPassword = localStorage.getItem("PatientPassword")
  const Patientname = localStorage.getItem("Patientname")
  const patientemail = localStorage.getItem("Patientemail")
  const Pemail = patientemail.slice(1,-1)
const [AllDoctor,setAllDoctor] = useState([])
  useEffect(()=> {
         
    //  const response =  
    //                    fetch('http://localhost:1337/AllPatient');
    //  const alldata =  response.json();
    //  setAllPatient(alldata.data.AllPatientData);
    async function asyncCall() {
   await axios.get('http://localhost:1337/AllDoctor')
   
    .then(result => {setAllDoctor(result.data.data.AllDoctorData); console.log(result.data.data.AllDoctorData)})
    .catch(err => console.log(err))
    }
    
  
 asyncCall()
}, []);
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



          <div className='PMainDiv'>
          {AllDoctor.map((data, i) => {
              return (
                
                <div className='MainOutDiv'>

              <div className='Dimg'><img src={image} className='PDimg'></img></div>
              <div className='PRightData'>
                <div className='Dname'><b>Name</b> : {data.name}</div>
                <div className='Dspeciality'><b>Speciality</b> : {data.speciality}</div>
                <div className='DFee'><b>Consultancy Fees</b> : ₹500/hr</div>
                <div><Link to={`/BookAppointment`}><button className='PPBtn' onClick={()=>{localStorage.setItem("Dname",data.name); localStorage.setItem("Demail",data.email)}}>Book Now !</button></Link></div>
              </div>
            </div>



              );
            })}
            



          </div>


        </div>
      </div>
    </div>
  )
}

export default PatientDashboard