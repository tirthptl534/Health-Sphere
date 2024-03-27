import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { DoctorDashboard } from "../DoctorDashboard/DoctorDashboard";
import "../Dashboard/AdminDashboard.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import {message} from "antd"
import { Modal, ModalHeader } from "reactstrap";
import Logo from "../../Assests/LL.png"

function Prescription() {
  function Logout (){
    window.location.href='/'
  }
  const [Pmodal, setPmodal] = useState(false);

  const [patientname, setpatientname] = useState();
  const [patientemail, setpatientemail] = useState();
  const [category , setcategory] = useState()
  const [description, setdescription] = useState()
  const [medicine, setmedicine] = useState([])
  const [patientdata, setpatientdata] = useState([]);
  const [AllMedicineData, setAllMedicineData] = useState([]);
  
  useEffect(() => {
    async function asyncCall() {
      await axios
        .get("http://localhost:1337/AllPatientNameEmail")

        .then((result) => {
          setpatientdata(result.data.data.AllPatientNameEmail);
          console.log(result.data.data.AllPatientNameEmail);
        })
        .catch((err) => console.log(err));


        await axios
        .get("http://localhost:1337/AllMedicineData")

        .then((result) => {
          setAllMedicineData(result.data.data.AllMedicineData);
          console.log(result.data.data.AllMedicineData);
        })
        .catch((err) => console.log(err));
    }
    asyncCall();
  }, []);
  const doctoremail = localStorage.getItem("Doctoremail")
  const doctorname = localStorage.getItem("Doctorname")
  const SendPrescription = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:1337/SendPrescription",{patientname,patientemail,category,description,medicine,doctorname,doctoremail})
    .then(result =>{console.log(result); message.success("Prescription Send Successfully")})
    .catch(err => console.log(err))
 
    }
    const DoctorName = localStorage.getItem("Doctorname")
    const Doctoremail= localStorage.getItem("Doctoremail")
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
              }} id="ProfilePic"class="fa-solid fa-circle-user"></i></div>
      </div>
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
            <i
              class="fa-solid fa-prescription-bottle-medical"
              id="NavBarIcon"
            ></i>
            <div className="NavDashboard">Prescription</div>
            <div className="PFeature">Prescription Features</div>
          </div>

          <div className="">
            <div className="PSendP">
              Send Prescription To:
               <form onSubmit={SendPrescription}>
              <div className="PSelectP">
                <FormControl sx={{ m: 1, minWidth: 260 }}>
                  <InputLabel id="demo-simple-select-label">
                    Select Patient
                  </InputLabel>
                  <Select
                    defaultValue=""
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={patientname}
                    label="Patient Name"
                    onChange={(e) => setpatientname(e.target.value)}
                  >

                     {patientdata?.map((data, i) => (
                      <MenuItem value={data.fname}>
                        {data.fname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 260 }}>
                  <InputLabel id="demo-simple-select-label">
                    Select Email
                  </InputLabel>
                  <Select
                    defaultValue=""
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={patientemail}
                    label="Patient email"
                    onChange={(e) => setpatientemail(e.target.value)}
                  >

                     {patientdata?.filter(patientdata => patientdata.fname === patientname).map((data, i) => (
                      <MenuItem value={data.email}>
                        {data.email}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>


                <FormControl sx={{ m: 1, minWidth: 260 }}>
                  <InputLabel id="demo-simple-select-label">
                    Select Category
                  </InputLabel>
                  <Select
                    defaultValue=""
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Patient Name"
                    onChange={(e) => setcategory(e.target.value)}
                  >
                          <MenuItem value={"Syrup"}>Syrup</MenuItem>
                          <MenuItem value={"Capsules"}>Capsules</MenuItem>
                          <MenuItem value={"Drops"}>Drops</MenuItem>
                          <MenuItem value={"Injections"}>Injections</MenuItem>

                    
                  </Select>
                </FormControl>


                <FormControl sx={{ m: 1, minWidth: 260 }}>
                  <InputLabel id="demo-simple-select-label">
                  Select Medicine
                  </InputLabel>
                  <Select
                  multiple
                    defaultValue=""
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={medicine}
                    label='Select Medicine'
                    onChange={(e) => setmedicine(e.target.value)}
                  >
                   {AllMedicineData?.filter(AllMedicineData => AllMedicineData.category === category).map((data, i) => (
                      
                      
                      <MenuItem value={data.name}>
                        {data.name}
                      </MenuItem>
                    ))}      

                    
                  </Select>
                </FormControl>

              </div>

                    <div className="PDesc">
                        <TextField
                        type="text"
                        value={description}
                        onChange={(e) => setdescription(e.target.value)}
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        required
                        className="P"
                      />{" "}
                    </div>
                  
                    <div>
                    <button
                      className="PSbtn"
                      onClick={() => {

                       }}
                     >   
                      {" "}
                      Send Prescription
                     </button>
                    </div>
                    </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Prescription;
