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
import Switch from "@mui/material/Switch";

function UpdateDoctor() {
    const [checked, setChecked] = React.useState(false);
    const [status,setStatus] = useState(0)

    const handleChange = (event) => {
    
        setChecked(!checked);
        if(checked == true){setStatus(1)}
        else{setStatus(0)}
       
        
      };
    const [name, setname] = useState();
  const [age, setage] = useState();
  const [address, setaddress] = useState();
  const [birthdate, setbirthdate] = useState();
  const [contact, setcontact] = useState();
  const [email, setemail] = useState();
  const [salary, setsalary] = useState();
  const [speciality, setspeciality] = useState();
  const [gender, setgender] = useState();

  const navigate = useNavigate();
  const { id } = useParams("");


  const UpdateDoctor = async(e)=>{
    e.preventDefault();

    


    const res2 = await fetch(`http://localhost:1337/updateDoctor/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name,
age,
address,
birthdate,
contact,
email,
salary,
speciality,
gender,
status,
        })
    });

    const data2 = await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
        alert("fill the data");
    }else{
      message.success("Data Updated Successfully")
      navigate('/Doctor');
        
    }

}


const [inpval, setINP] = useState({
    name: "",
age: "",
address: "",
birthdate: "",
contact: "",
email: "",
salary: "",
speciality: "",
gender: "",
  })



  
  const getdata = async () => {
    const res = await fetch(`http://localhost:1337/GetInfoDoctor/${id}`, {
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
      <div>Update Doctor Details</div>
      <div><form onSubmit={UpdateDoctor}>
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
                        label={inpval.contact}
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
                        label={inpval.email}
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
                        label={inpval.age}
                        variant="outlined"
                        
                        required
                      />{" "}
                    </div>

                    <div className="Fname">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          required
                          label="Birthdate"
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
                        label={inpval.salary}
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
                        label={inpval.address}
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
                        label={inpval.speciality}
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
                    <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />


                    

                  <div className="ISubmitBtn">
                    <button type="submit" className="Sbtn">
                      Update Doctor Details
                    </button>
                    
                  </div>
                </form></div>
    </div>
  )
}

export default UpdateDoctor
