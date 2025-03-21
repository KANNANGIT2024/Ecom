import React, { useEffect, useState } from 'react'
import { getUserDetaiels } from './api'
import { useNavigate } from 'react-router-dom'
function Initialpage() {
    const navigate=useNavigate()
  const [role,setRole]=useState('')
  useEffect(() => {
    const featchRole = async () => {
      try {
        const result = await getUserDetaiels();
        console.log("reslt",result);
        
        if (result?.user?.role === 'admin') {
          navigate('/Adminhome');
        } else if (result?.user?.role === 'user') {
          navigate('/TaskManager');
        } else {
          console.error("Invalid role or unauthenticated user");
          localStorage.removeItem('token'); // Clear token for unauthenticated users
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate('/'); // Navigate to default route on error
      }
    };
  
    featchRole();
  }, [navigate]);
  
    return (
    <>
    {role==="admin"&&navigate('/Adminhome')}
    {role==="user"&&navigate('/TaskManager')}

    </>
  )
}

export default Initialpage