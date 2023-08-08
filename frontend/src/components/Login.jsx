import axios from 'axios'
import React, { useRef, useState } from 'react'


export default function Login(props) {

    const [sucess,setSuccess]=useState(false)
    const [error ,setError]=useState(false)

    
    const passwordRef=useRef()
    const emailRef=useRef()

    const handleSubmit=async(e)=>{
        e.preventDefault()


        // user who want to login
        const User={
            
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        console.log("NEW USER",User)

        //send the new user to DB and get response by using axios
        try{
            const res=await axios.post('/users/login',User)

            props.myStorage.setItem("user",res.data.username )
            props.setCurrentUser(res.data.username) 
            setSuccess(true)
            setError(false)
            console.log(res)
         
            emailRef.current.value=""
            passwordRef.current.value=""

            props.setShowLogin(false)


        }
        catch(err){
            console.log(err)
            setError(true)
        }


    }

  return (
    <div className='register-container card'>

         <form onSubmit={handleSubmit}>


            <input type="email " placeholder='Email' ref={emailRef} />
            <input type="password" placeholder='Password' ref={passwordRef}/>
            <button className='btn registerBtn'>Login</button>
           {sucess && <p style={{textAlign:"center",fontFamily:"700"}} className='success'>Successfully Registered !!</p>} 
           {error && <p className='error'>Error in Registered !!</p>}
            
         </form>
      
    </div>
  )
}
