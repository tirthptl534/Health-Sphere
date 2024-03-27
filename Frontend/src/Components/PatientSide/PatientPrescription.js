import React , {useState,useEffect} from 'react'
import { Patientdata } from './Patientdata';
import "../Dashboard/AdminDashboard.css";
import "../DoctorDashboard/MainDoctorDashboard.css";
import "./PatientSide.css"
import "../Pages/Patient.css"
import axios from 'axios';
import dayjs from "dayjs";
import { Modal, ModalHeader } from "reactstrap";
import Logo from "../../Assests/LL.png"


function PatientPrescription() {
  const [Pmodal, setPmodal] = useState(false);
  function Logout (){
    window.location.href='/'
  }
  const [PrescriptionData ,setPrescriptionData] = useState([])
  const PatientPassword = localStorage.getItem("PatientPassword")
    const Patientname = localStorage.getItem("Patientname")
   const patientemail = localStorage.getItem("Patientemail")
   console.log(patientemail)
   const finalemail = patientemail.slice(1, -1);
   console.log(finalemail)
  
  useEffect(()=> {
         
    //  const response =  
    //                    fetch('http://localhost:1337/AllPatient');
    //  const alldata =  response.json();
    //  setAllPatient(alldata.data.AllPatientData);
    async function asyncCall() {
      await axios.get('http://localhost:1337/PrescriptionData')
   
    .then(result => {setPrescriptionData(result.data.data.AllPrescriptionData); console.log()})
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
          <i class="fa-solid fa-prescription-bottle-medical" id="NavBarIcon"></i>
          <div className="NavDashboard">Prescription</div>
          <div className="NavDashfeature">Prescription Features</div>
        </div>
        
        <div>
          <div className='PDetail'>Prescription Details :</div>

          <div className='PTable'>
          <table className="Ptable">
                <thead className="Thead">
                  <tr>
                   
                    <th>Sr.No</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Medicine</th>
                    <th>Description</th>
                    <th>Doctor Name</th>
                    <th>Doctor Email</th>
                  </tr>
                </thead>
                <tbody>
                  {PrescriptionData?.filter(PrescriptionData => PrescriptionData.patientemail === finalemail).map((data, i) => (
                    
                    <tr key={i}>
                  
                     
                      <td>{++i}</td>
                      
                      <td>{dayjs(data.date).format("DD/MM/YYYY")}</td>
                      <td>{data.category}</td>
                      <td>{data.medicine},</td>
                      <td>{data.description}</td>
                      <td>{data.doctorname.slice(1,-1)}</td>
                      <td>{data.doctoremail.slice(1,-1)}</td>
                      
                      
                    </tr>
                   
                     
                  ))}
                </tbody>
              </table> 
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PatientPrescription