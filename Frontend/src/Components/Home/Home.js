import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
import HM from "../../Assests/F3.png"
function Home() {
  return (
    <div className='home'>
      
        <div className='Nav'>
            <Link to={'/AdminLogin'} className='Admin'>Admin's Login</Link>
            <Link to={'/DoctorLogin'} className='DocLog'>Doctor's Login</Link>
            <Link to={'/PatientLogin'} className='PatientLog'>Patient's Login</Link>
        </div>
        {/* <div className='top'>
          <div>A Heritage in Care.</div>
          <div className='exe'>A Reputation in </div>
          <div >excellence</div>
        </div> */}

        <div><img className="HM1"src={HM} alt='HM' /></div>
        <div className='mid'>
          <div className='text1'>We Are Here For Your Care</div>
          <div className='text2'>We Are The Best  Doctors</div>
          <div className='text3'>We are here for your care 24/7. Any help just call us.</div>
        </div>
    </div>
  )
}

export default Home