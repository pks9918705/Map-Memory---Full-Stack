import axios from 'axios'
import React, { useRef, useState } from 'react'


export default function Register(props) {

    const [sucess,setSuccess]=useState(false)
    const [error ,setError]=useState(false)

    const nameRef=useRef()
    const passwordRef=useRef()
    const emailRef=useRef()

    const handleSubmit=async(e)=>{
        e.preventDefault()


        const newUser={
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value
        }
        console.log("NEW USER",newUser)

        //send the new user to DB and get response by using axios
        try{
            const res=await axios.post('/users/register',newUser)
            setSuccess(true)
            setError(false)
            console.log(res)
            nameRef.current.value=""
            emailRef.current.value=""
            passwordRef.current.value=""

            props.myStorage.setItem("user",res.data.username)
            props.setShowRegister(false)
            props.setCurrentUser(res.data.username)


        }
        catch(err){
            console.log(err)
            setError(true)
        }


    }

  return (
    <div className='register-container card'>

         <form onSubmit={handleSubmit}>

            <input type="text " placeholder='Username' ref={nameRef}  />
            <input type="email " placeholder='Email' ref={emailRef} />
            <input type="password" placeholder='Password' ref={passwordRef}/>
            <button className='btn registerBtn'>Register</button>
           {sucess && <p style={{textAlign:"center",fontFamily:"700"}} className='success'>Successfully Registered !!</p>} 
           {error && <p className='error'>Error in Registered !!</p>}
            
         </form>
      
    </div>
  )
}
