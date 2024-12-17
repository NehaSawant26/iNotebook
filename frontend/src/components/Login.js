import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import './Login.css'
import { Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();

  const host = "http://localhost:5000"

  const handleSubmit = async (e) => {
    e.preventDefault(); // To prevent from reloding the page 

    // CALL API
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    //console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Success: Logged in successfully", "success");
      navigate("/");
    }
    else {
      props.showAlert("Error: Invalid credentials", "danger")
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className=" d-flex justify-content-center align-items-center  mt-4 ">
      <div className="wrapper">
      <div className=" form-box ">
      <form onSubmit={handleSubmit}>
      <h2>Log in to continue to iNotebook</h2>

        <div className=" input-box mt-3 mb-3">

          <input type="email" className="control" placeholder='Enter Email'  onChange={onChange} id="email" name="email" value={credentials.email} aria-describedby="emailHelp" />
          <EmailIcon className="icon"/>
          
        </div>
        <div className="input-box mt-3 mb-3">
        
          <input type="password" className="control" placeholder='Enter Password'  onChange={onChange} id="password" name="password" value={credentials.password} />
          <LockIcon className="icon"/>
        </div>

        <button type="submit" >Login</button>
        <div className="register-link">
          <p>Don't have an account? <Link className="Link-style" to="/Signup">Register</Link></p>

        </div>
      </form>
      </div>
      </div>

    </div>
  )
}

export default Login
