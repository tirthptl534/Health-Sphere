import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
// import jwt from 'jasonwebtoken'
import { useNavigate  } from "react-router-dom";

import {message} from "antd"
const DoctorSignup = () => {

  //const history = useHistory()
  const [name, setname] = useState();
  const [speciality, setspeciality] = useState();
  const [contact, setcontact] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

//   const [error, setError] = useState("");
  const navigate = useNavigate();

  async function registerDoctor(event){
	event.preventDefault()
	const response = await fetch('http://localhost:1337/api/register' , {
	method:'POST',
	headers:{
		'Content-Type':'application/json'
	},	
	body:JSON.stringify({
			name,
			speciality,
			contact,
			email,
			password,
		}),
	})
	const data = await response.json()
  if(data.error !== undefined)
    alert(data.error)
	if(data.status === 'ok'){
    navigate('/DoctorLogin')
    message.success("SignUp Successfully");
	}
  }

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/DoctorLogin">
            <button type="button" className={styles.white_btn}>
              Login Now
            </button>
          </Link>
        </div>
        <div className={styles.right}>
		
          <form className={styles.form_container} onSubmit={registerDoctor} >
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              value={name} 
			  onChange={(e) => setname(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Speciality"
			  value={speciality}
			  onChange={(e) => setspeciality(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="phone"
              placeholder="Contact No"
			  value={contact}
              onChange={(e) => setcontact(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
			  value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
			  value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              className={styles.input}
            />
            {/* {error && <div className={styles.error_msg}>{error}</div>} */}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorSignup;
