import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router v6

export default function Login(props) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const passwordRef = useRef();
  const emailRef = useRef();

  // Use useNavigate to get the navigate function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const User = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", User);
      if(res){ console.log("Bhai login info bhej diya hmmne")}
      // Assuming the cookie is set as "user_id" with a value
      const user_id = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("user_id="))
        .split("=")[1];
    
      console.log("User ID from cookie:", user_id);
    
      localStorage.setItem("user_id", user_id); // Store user_id in local storage
    
      setSuccess(true);
      setError(false);
      
      emailRef.current.value = "";
      passwordRef.current.value = "";
      props.setShowLogin(false)
    
      navigate("/");
    } catch (error) {
      setError(true);
      setSuccess(false);
      props.setShowLogin(true)
    }
   
  };

  return (
    <div className="register-container flex-column">
      <h1>LogIn</h1>
      <form className="flex-column" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" ref={emailRef} />
        <input type="password" placeholder="Password" ref={passwordRef} />
        <button className="btn registerBtn">Login</button>
        {success && <p className="success">Successfully Logged In!!</p>}
        {error && <p className="error">Error in Login!!</p>}
      </form>
    </div>
  );
}
