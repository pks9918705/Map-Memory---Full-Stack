import React from "react";


export default function Navbar(props) {

     

    const handleLogout=()=>{
      props.setCurrentUser(null)
      props.myStorage.clear()
      props.setShowLogin(true)
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
