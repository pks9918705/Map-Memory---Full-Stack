import { createContext, useState, useContext, useEffect } from "react";
import React from 'react';
import { useCookies } from 'react-cookie';
 
import axios from 'axios';
 
 
const authContext = createContext()

function useValue() {
    const value = useContext(authContext)
    return value;
}




function CustomAuthContext({ children }) {

    //state deefine kro
    const [user, setUser] = useState(null);
    const [cookies] = useCookies(['user_id']);
    const [authenticated, setAuthenticated] = useState(false);
  

    console.log("context is called")

    useEffect(() => {
        // Check if user_id cookie is present
        if (!cookies.user_id) {
            setAuthenticated(false);
            console.log("user_id cookie is not present")
            return;
        }
        console.log('user cookie is authenticated');
        

        // Fetch user information based on user_id
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${cookies.user_id}`); // Adjust the API endpoint
                setUser(response.data);
                setAuthenticated(true);

            } catch (error) {
                console.error('Error fetching user information:', error);
                setAuthenticated(false);
            }
        };

        fetchUser();
    }, [cookies]);

    // if (!authenticated) {
    //     // Redirect to sign-in page if not authenticated
    //     console.log('NOt able to authenticate')

          
    // }


    return (
        <authContext.Provider value={{user,authenticated,setAuthenticated,setUser}} >
            {children}
        </authContext.Provider>
    )



}

export { useValue }
export default CustomAuthContext;
