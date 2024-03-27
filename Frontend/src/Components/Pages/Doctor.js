import React, { useState, useEffect } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { Modal, ModalHeader } from "reactstrap";
import { TextField } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NavLink ,useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import "../Pages/Doctor.css"
import { green } from "@mui/material/colors";
import FileBase64 from 'react-file-base64';
import Logo from "../../Assests/LL.png"


function Doctor() {
  const [modalOpen, setModalOpen] = useState(false);
  const [Pmodal, setPmodal] = useState(false);
  const [name, setname] = useState();
  const [age, setage] = useState();
  const [address, setaddress] = useState();
  const [birthdate, setbirthdate] = useState();
  const [contact, setcontact] = useState();
  const [email, setemail] = useState();
  const [salary, setsalary] = useState();
  const [speciality, setspeciality] = useState();
  const [gender, setgender] = useState();
  const [AllDoctor, setAllDoctor] = useState([]);
  const [detailshow , setdetailshow] = useState([])
  const [open, setOpen] = React.useState(false);
  const [img,setImg] = useState()
  
  function Greeting(props){
    
    const isActive = props.isActive
    
    if(isActive === 1){
      return <div className="DActive">Active</div>
    }else{
      return <div className="DIActive">InActive</div>
    }

  }



  function Logout (){
    window.location.href='/'
  }



  const AddDoctor = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:1337/AddDoctor", {
        name,
        age,birthdate,contact,email,salary,speciality,gender,address
      })
      .then((result) => {
        if (result.status === 205) {
          setModalOpen(false);
          toast.error("Duplicate Email", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (result.data.status === "Success") {
          setModalOpen(false);
          toast.success("Patient Added successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.success("Patient Added successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .then(window.location.reload())
      .catch((err) => console.log(err));
  };

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



  const DeleteDoctor = (id) => {
    axios.delete('http://localhost:1337/DeleteDoctor/'+id)
    .then(alert("Doctor Data Deleted Successfully"))
    .then(window.location.reload())
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



  return (
    <div>
      <div className="MainNavbar">
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
              }} id="ProfilePic"class="fa-solid fa-circle-user"></i></div></div>
      <div className="MainBody">
        <div className="MainSidebar">
          <div className="SideBarData">
            {Dashboard.map((val, key) => {
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
          <div className="PNavBarForMainData">
            <i className="fa-solid fa-user-doctor" id="PNavBarIcon"></i>

            <div className="INavDashboard">Doctor</div>
            <div className="DNavDashfeature">Doctor's Features</div>
          </div>

          <div className=" ">
            <Modal
              size="lg"
              isOpen={modalOpen}
              toggle={() => setModalOpen(!modalOpen)}
            >
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                Add Doctor
              </ModalHeader>
              <div>
                <form onSubmit={AddDoctor}>
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
                      />
                    </div>
                    <div className="Fname">
                      <TextField
                      className="DAddWidth"
                        type="tel"
                        required
                        value={contact}
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^[0-9]+$/;
                          if (regex.test(value)) {
                            setcontact(value);
                          } else {
                            setcontact('');
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
                        type="text"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        
                        required
                      />{" "}
                    </div>
                  </div>
                  <div className="Srow">
                    {/* <div className="IFname">
                      <div className='IMfgdate'>
                      
                       </div>
                      <div className='IExpdate'>
                       <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker  required label="Expiry Date" value={expirydate} onChange={(newValue) => setexpirydate(newValue)} />
                       </LocalizationProvider>
                       </div>
                      
                    </div> */}
                    <div className="Fname">
                      <TextField
                        type="Number"
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                        id="outlined-basic"
                        label="Age"
                        variant="outlined"
                        
                        required
                      />{" "}
                    </div>

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
                      <TextField
                        type="Number"
                        value={salary}
                        onChange={(e) => setsalary(e.target.value)}
                        id="outlined-basic"
                        label="Salary"
                        variant="outlined"
                        required
                        />{" "}
                    </div>
                  </div>
                  <div className="ITrow">
                    <div className="Fname">
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        >
                        <FormControlLabel
                          value={"Female"}
                          control={<Radio />}
                          label="Male"
                          onChange={(e)=>{setgender(e.target.value); console.log(gender)}}
                          />
                        <FormControlLabel
                          value={"Male"}
                          control={<Radio />}
                          label="Female"
                          onChange={(e)=>{setgender(e.target.value); console.log(gender)}}
                        />
                        
                        </RadioGroup>
                      </div>
                      <div className="DAddress">
                      <TextField
                        type="text"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        className="DAddWidth"
                        
                        required
                        />{" "}
                    </div>
                    <div className="DSalary">
                      <TextField
                        type="text"
                        value={speciality}
                        onChange={(e) => setspeciality(e.target.value)}
                        id="outlined-basic"
                        label="Speciality"
                        variant="outlined"
                        
                        required
                      />{" "}
                    </div>
                    {/* Choose Image
                    <FileBase64
                      multiple={ false }
                      onDone={({base64})=>setImg({
                        img : base64
                      })} /> */}
                    </div>
                    

                    

                  <div className="ISubmitBtn">
                    <button type="submit" className="Sbtn">
                      Add Doctor
                    </button>
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
              Add Doctor
            </button>
            <table className="Ptable">
              <thead className="Thead">
                <tr>
                  <th></th>
                  <th>Sr No</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Contact No</th>
                  <th>Speciality</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {AllDoctor?.map((data, i) => (
                  <React.Fragment key={data._id}>
                    <tr key={i}>
                      {/* <td><i  class="fa-solid fa-greater-than fa-2xl" onClick={()=>toggleShown(data.name)}></i></td> */}
                      <td>
                        <IconButton
                          id="Iicon"
                          aria-label="expand row"
                          size="small"
                          onClick={() => {
                            setOpen(!open);
                            toggleShown(data.name);
                          }}
                        >
                          {open ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </td>
                      <td>{++i}</td>
                      <td>{data.name}</td>
                      <td>{data.gender}</td>
                      <td>{data.contact}</td>
                      
                      <td>{data.speciality}</td>
                     <td><Greeting isActive = {data.status}  /></td>
                      
                      <td className="Paction">
                        <div>
                          <NavLink to={`UpdateDoctor/${data._id}`}>
                            <i class="fa-solid fa-pen"></i>
                          </NavLink>
                        </div>
                        <div className="PDelete">
                          <i
                            class="fa-solid fa-trash"
                            id="deleteicon"
                            onClick={(e) => DeleteDoctor(data._id)}
                          ></i>
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
                        </div>
                      </td>
                    </tr>

                    {detailshow.includes(data.name) && (
                      <tr className="Additional-info">
                        {/* <div className='CData'> */}
                        <td>
                          <b>Name</b> : {data.name}
                        </td>
                        <td>
                          <b>Age</b> : {data.age}
                        </td>
                        <td>
                          <b> Birthdate :</b>{" "}
                          {dayjs(data.birthdate).format("DD/MM/YYYY")}
                        </td>
                        <td>
                          <b>Contact No</b> : {data.contact}
                        </td>
                        <td>
                          <b>Email :</b> {data.email}
                        </td>
                        <td>
                          <b>salary :</b> {data.salary}
                        </td>
                        
                        <td>
                          <b>Address :</b> {data.address}
                        </td>
                        {/* </div> */}
                      </tr>
                    )}
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

export default Doctor;
