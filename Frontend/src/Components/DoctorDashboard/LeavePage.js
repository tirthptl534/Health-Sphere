import React, { useState,useEffect } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DoctorDashboard } from "../DoctorDashboard/DoctorDashboard";
import "../Dashboard/AdminDashboard.css";
import { TextField } from "@mui/material";
import axios from "axios";
import "../DoctorDashboard/MainDoctorDashboard.css";
import {message} from "antd"
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import logo from "../../Assests/pending-icon.png"
import Logo from "../../Assests/LL.png"

function LeavePage() {
  function Logout (){
    window.location.href='/'
  }
  const [Pmodal, setPmodal] = useState(false);

  const [startdate, setstartdate] = useState();
  const [enddate, setenddate] = useState();
  const [duration, setduration] = useState();
  const [reason, setreason] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [leavedata,setleavedata] = useState([])
  
  const AddLeave = async (e) => {
    e.preventDefault();
    const dname = localStorage.getItem("Doctorname")
    const demail = localStorage.getItem("Doctoremail")
    const name = dname.slice(1,-1)
    const email = demail.slice(1,-1)
    await axios
      .post("http://localhost:1337/AddLeave", {
        startdate,enddate,duration,reason,name,email
      })
      .then(result=>{
        console.log(result)
        if(result.status === 201){
          setModalOpen(false)
          message.success("Leave Application Added Successfully");
        }
        navigate('/LeavePage')
      
      }
        )
      .catch((err) => console.log(err));
  };

  useEffect(()=> {
         
    //  const response =  
    //                    fetch('http://localhost:1337/AllPatient');
    //  const alldata =  response.json();
    //  setAllPatient(alldata.data.AllPatientData);
    async function asyncCall() {
    await axios.get('http://localhost:1337/LeaveApp')
    .then(result => {setleavedata(result.data.data.LeaveApplication);
     
       if(result.data.status === 'ok'){
         
         message.success("Data Fetched Successfully") 
      }
    })
       
    .catch(err => console.log(err))
    }
    
  
 asyncCall()
}, []);

const DoctorName = localStorage.getItem("Doctorname")
const Doctoremail= localStorage.getItem("Doctoremail")
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
                <div className="AdminInfo">Account Type : Doctor</div>
                <div className="AdminInfo">UserName : {DoctorName.slice(1,-1)}</div>
                <div className="AdminInfo">Email : {Doctoremail.slice(1,-1)}</div>
                <div className="AdminInfo">Password : ******</div>
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
            <i class="fa-solid fa-hospital-user" id="NavBarIcon"></i>
            <div className="NavDashboard">LeavePage</div>
            <div className="DLeave">Apply For Leave</div>
          </div>
          <div className="PBtn">
            <Modal
              size="lg"
              isOpen={modalOpen}
              toggle={() => setModalOpen(!modalOpen)}
            >
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                Apply For Leave
              </ModalHeader>
              <div>
                <form onSubmit={AddLeave}>
                  <div className="Frow">
                    <div className="Fname">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          required
                          label="Start Date"
                          value={startdate}
                          onChange={(newValue) => setstartdate(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="Fname">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          required
                          label="End Date"
                          value={enddate}
                          onChange={(newValue) => setenddate(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                  </div>
                  <div className="Srow">
                    <div className="Fname">
                      <TextField
                        type="number"
                        required
                        value={duration}
                        onChange={(e) => {
                          setduration(e.target.value);
                        }}
                        id="outlined-basic"
                        label="Duration of Leave"
                        variant="outlined"
                        className="LC"
                      />{" "}
                    </div>
                    <div className="Fname">
                      <TextField
                        type="text"
                        required
                        value={reason}
                        onChange={(e) => {
                          setreason(e.target.value);
                        }}
                        id="outlined-basic"
                        label="Reason For Leave"
                        variant="outlined"
                        className="LC"
                      />{" "}
                    </div>
                  </div>

                  <div className="SubmitBtn">
                    <button type="submit" className="Sbtn">
                      Submit Application
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
              Apply For Leave
            </button>

            <div>
            <table className="Ptable">
                <thead className="Thead">
                  <tr>
                    
                    <th>Sr.No</th>
                    <th>Reason</th>
                    <th>Duration</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leavedata?.map((data, i) => (
                    <React.Fragment key={data._id}>
                    <tr key={i}>
                     
                     
                      <td>{++i}</td>
                      <td>{data.reason}</td>
                      <td>{data.duration}</td>
                      <td>{dayjs(data.startdate).format("DD/MM/YYYY")}</td>
                      <td>{dayjs(data.enddate).format('DD/MM/YYYY')}</td>
                      <td><Greeting currstatus={data.approve} /></td>
                      
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

export default LeavePage;
