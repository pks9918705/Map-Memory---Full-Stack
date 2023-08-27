import axios from 'axios';
import React, { useRef, useState } from 'react';
import "./Register.css";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [success, setSuccess] = useState(false); // Corrected variable name
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const nameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        try {
            const res = await axios.post('/users/register', newUser);
            setSuccess(true);
            setError(false);
            console.log(res);
            nameRef.current.value = "";
            emailRef.current.value = "";
            passwordRef.current.value = "";

            navigate('/login'); // Redirect to the login page

        } catch (err) {
            console.log(err);
            setError(true);
        }
    }

    return (
        <div className='register-container flex-column'>
            <h1>Sign Up</h1>
            <form className='flex-column' onSubmit={handleSubmit}>
                <input type="text" placeholder='Username' ref={nameRef} />
                <input type="email" placeholder='Email' ref={emailRef} />
                <input type="password" placeholder='Password' ref={passwordRef} />
                <button className='btn registerBtn'>Register</button>
                {success && <p style={{ textAlign: "center", fontFamily: "700" }} className='success'>Successfully Registered !!</p>}
                {error && <p className='error'>Error in Registered !!</p>}
            </form>
        </div>
    )
}
