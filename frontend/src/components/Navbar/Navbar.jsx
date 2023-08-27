import React from "react";
import { useValue } from "../../context/authContext";



export default function Navbar(props) {

    //  const {setCurrentUser,setShowRegister,setShowLogin}=props

    const { setAuthenticated,setUser} = useValue();
     

    function deleteCookie(cookieName) {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    
     


    const handleLogout=()=>{
      deleteCookie('user_id');
      props.setCurrentUser(null)
      props.myStorage.clear()
      props.setShowLogin(true)
      setAuthenticated(false)
      setUser(null)
      

    }

    function handleLogin(){
      props.setShowLogin(true)
      props.setShowRegister(false)

    }
    function handleRegister(){
      props.setShowRegister(true)
      props.setShowLogin(false)

    }

  return (
    <div className="nav">
         

      {props.currentUser? ( <>

        <button className="btn user">
        
        {props.currentUser}</button>
        <button className="btn logout" onClick={handleLogout}>Logout</button>
      </>):(<>
        <button className="btn login" onClick={handleLogin}>Login</button>
          <button className="btn register" onClick={handleRegister}>Register</button>
      </>)}
    </div>
  );
}
