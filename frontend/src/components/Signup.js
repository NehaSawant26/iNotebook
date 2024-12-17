import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const Signup = (props) => {
  const [credentials, setCredentials]= useState({name :"", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();

    const host = "http://localhost:5000"

    const handleSubmit= async(e)=>{
      e.preventDefault(); 

      // CALL API
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", 
      
        headers: {
          "Content-Type": "application/json"
         
        },
        body: JSON.stringify({name: credentials.name , email: credentials.email, password: credentials.password}),
      });
      const json = await  response.json(); 
       console.log(json);
       if(json.success){
        //Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Success : Account created successfully", "success")
        navigate("/");
       }
       else{
        props.showAlert("Error : Invalid details", "danger")
       }
        
}
const onChange =(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
 }
  return (
    <div className= " d-flex justify-content-center align-items-center mt-4">
      <div className="wrapper">
      <div className=" form-box">

      <form onSubmit={handleSubmit}>
      <h2>Create an account to use iNotebook</h2>

      <div className="input-box mt-3 mb-3">
    
    <input type="text" className="form-control" placeholder='Enter your Name'   id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/> 
    <PersonIcon className="icon"/>
  </div>

  <div className="input-box mb-3">
   
    <input type="email" className="form-control" placeholder='Enter Email'  id="email" name="email"  onChange={onChange}aria-describedby="emailHelp"/> 
    <EmailIcon className="icon"/>
  </div>

  <div className="input-box mb-3">
    
    <input type="password" className="form-control" placeholder='Enter Password'  id="password" name="password" onChange={onChange} minLength={5} required/>
    <LockIcon className="icon"/>
  </div>

  <div className=" input-box mb-3">
    
    <input type="password" className="form-control" placeholder='Enter Confirm Password'  id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
    <LockIcon className="icon"/>
  </div>
  
  <button type="submit" >Sign up</button>
  <div className="register-link">
          <p>Already have an account? <Link className="Link-style" to="/login">Login</Link></p>

        </div>
</form>
</div>
</div>
    </div>
  )
}

export default Signup
