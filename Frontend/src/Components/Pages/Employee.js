import React,{useState,useEffect} from "react";
import { Modal, ModalHeader } from "reactstrap";
import { Dashboard } from "../Dashboard/Dashboard";
import "../Dashboard/AdminDashboard.css";
import { TextField } from "@mui/material";
import { message } from "antd";
import axios from "axios";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import dayjs from "dayjs";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';                   
import { NavLink ,useNavigate } from 'react-router-dom';
import "./Employee.css"
import Logo from "../../Assests/LL.png"

function Employee() {
  const DeleteEmployee = (id) => {
    axios.delete('http://localhost:1337/DeleteEmployee/'+id)
    .then(alert("Employee Data Deleted Successfully"))
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
    const [detailshow , setdetailshow] = useState([])

  const [modalOpen, setModalOpen] = useState(false);
  const [Query, setQuery] = useState("");
  const [name,setname] = useState();
  const [age,setage] = useState();
  const [address,setaddress] = useState();
  const [email,setemail] = useState();
  const [salary,setsalary] = useState();
  const [classification,setclassification] = useState();
  const [gender,setgender] = useState();
  const [birthdate,setbirthdate] = useState();
  const [contact,setcontact] = useState();
  const [AllEmployee,setAllEmployee] = useState([])
  const [open, setOpen] = React.useState(false);

  const AddEmployee = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:1337/AddEmployee",{name,age,address,contact,email,salary,classification,gender,birthdate})
    .then(result =>{
      setModalOpen(false)
       const timer = setTimeout(()=>{
        if(result.data.status === 201){
          message.success("Employee Added Successfully")
          

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
     async function asyncCall() {
     await axios.get('http://localhost:1337/AllEmployee')
     
      .then(result => {
        setAllEmployee(result.data.data.AllEmployeeData); console.log(result.data.data.AllEmployeeData)
      })
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
      <div className="TL"> <img src={Logo} alt="Logo" className="PHM"/></div>
        <div className="Sliding">
        <marquee className="MCol" direction="right">Welcome To Union Family Health Center</marquee></div>
        <div>
          
          <Modal
              size="lg"
              isOpen={modalOpen}
              toggle={() => setModalOpen(!modalOpen)}
            >
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
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
                setModalOpen(true);
              }} id="ProfilePic"class="fa-solid fa-circle-user"></i></div>
        
        </div>
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
          <div className="NavBarForMainData">
            <i class="fa-sharp fa-solid fa-hospital" id="NavBarIcon"></i>
            <div className="NavDashboard">Employee</div>
            <div className="NavDashfeature">Employee' Features</div>
          </div>

          <div className="Emp">
          <div className="PSearch"><TextField  id="outlined-basic" label="Search Name" variant="outlined" onChange={(e) => setQuery(e.target.value)}/></div>
          <div className="AddEmp">
          <Modal
              size="lg"
              isOpen={modalOpen}
              toggle={() => setModalOpen(!modalOpen)}
            >
              <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                Add Employee
              </ModalHeader>
              <div>
                <form onSubmit={AddEmployee}>
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
                      /></div>

                    <div className="Fname">
                       <TextField
                        type="text"
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                        id="outlined-basic"
                        label="Age"
                        variant="outlined"
                        required
                      /></div>
                    <div className="Fname">   
                    <TextField
                        type="text"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        required
                      /></div>
                  
                  </div>
                  <div className="Srow">
                  <div className="Fname"><TextField
                        type="text"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        id="outlined-basic"
                        label="E-Mail"
                        variant="outlined"
                        required
                      /></div>

                        <div className="Fname"> 
                        <TextField
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
                      />{" "}</div>



                        <div className="Fname"> 
                        <TextField
                        type="number"
                        value={salary}
                        onChange={(e) => setsalary(e.target.value)}
                        id="outlined-basic"
                        label="Salary"
                        variant="outlined"
                        required
                      /></div>


                  </div>

                  <div className="Trow">
                  <div className="Fname"> <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
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
                        
                        </RadioGroup></div>

                      <div className="Fname">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker  required label="BirthDate" value={birthdate} onChange={(newValue) => setbirthdate(newValue)} />
                       </LocalizationProvider>
                       </div>



                        <div className="Fname">
                       <FormControl sx={{ m: 1, minWidth: 260 }}>
                        <InputLabel id="demo-simple-select-label">Assign Department</InputLabel>
                        <Select
                          defaultValue = "" 
                          required
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={classification}
                          label="Category"
                          onChange={(e)=>setclassification(e.target.value)}
                        >
                          <MenuItem value={"Medical Department"}>Accounting</MenuItem>
                          <MenuItem value={"Nursing Department"}>Nursing Department</MenuItem>
                          <MenuItem value={"Operation Theatre Complex (OT)"}>Operation Theatre Complex (OT)</MenuItem>
                          <MenuItem value={"Pharmacy Department"}>Pharmacy Department</MenuItem>
                        </Select>
                        </FormControl> 


                        </div>
                     </div>

                     <div className="Frow">
                        

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
              className="AddPBtn2"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              {" "}
              Add Employee
            </button>



          </div>
          
          







          </div>
          <table className="Ptable">
              <thead className="Thead">
                <tr>
                  <th></th>
                  <th>Sr No</th>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th>Contact No</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {AllEmployee?.map((data, i) => (
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
                      <td>{data.email}</td>
                      <td>{data.contact}</td>
                      
                      <td>{data.classification}</td>
                    
                      
                      <td className="Paction">
                        <div>
                          <NavLink to={`UpdateEmployee/${data._id}`}>
                            <i class="fa-solid fa-pen"></i>
                          </NavLink>
                        </div>
                        <div className="PDelete">
                          <i
                            class="fa-solid fa-trash"
                            id="deleteicon"
                            onClick={(e) => DeleteEmployee(data._id)}
                          ></i>
                          
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
         
   
  );
}

export default Employee;
