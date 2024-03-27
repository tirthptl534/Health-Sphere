import React,{useState,useEffect} from "react";
import { TextField } from "@mui/material";
import { message } from "antd";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useParams,useNavigate  } from 'react-router-dom';

function UpdateEmployee() {
    const navigate = useNavigate();
    const { id } = useParams("");
    const UpdateEmployee = async(e)=>{
        e.preventDefault();
  
        
  
  
        const res2 = await fetch(`http://localhost:1337/updateEmployee/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                age,
                address,
                email,
                salary,
                classification,
                gender,
                birthdate,
                contact,
            })
        });
  
        const data2 = await res2.json();
        console.log(data2);
  
        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
          message.success("Data Updated Successfully")
          navigate('/Employee');
            
        }
  
    }



  


  const [name,setname] = useState();
  const [age,setage] = useState();
  const [address,setaddress] = useState();
  const [email,setemail] = useState();
  const [salary,setsalary] = useState();
  const [classification,setclassification] = useState();
  const [gender,setgender] = useState();
  const [birthdate,setbirthdate] = useState();
  const [contact,setcontact] = useState();







  const [inpval, setINP] = useState({
    name: "",
    age: "",
    address: "",
    email: "",
    salary: "",
    classification: "",
    gender: "",
    birthdate: "",
    contact: "",
  })




  const getdata = async () => {
    const res = await fetch(`http://localhost:1337/GetInfoEmployee/${id}`, {
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
        <div>Update Employee Details</div>
        <div>
             <form onSubmit={UpdateEmployee}>
                  <div className="Frow">
                  <div className="Fname">
                    <TextField
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        id="outlined-basic"
                        label={inpval.name}
                        variant="outlined"
                        required
                      /></div>

                    <div className="Fname">
                       <TextField
                        type="text"
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                        id="outlined-basic"
                        label={inpval.age}
                        variant="outlined"
                        required
                      /></div>
                    <div className="Fname">   
                    <TextField
                        type="text"
                        value={address}
                        onChange={(e) => setaddress(e.target.value)}
                        id="outlined-basic"
                        label={inpval.address}
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
                        label={inpval.email}
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
                        label={inpval.contact}
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
                        label={inpval.salary}
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

    </div>
  )
}

export default UpdateEmployee