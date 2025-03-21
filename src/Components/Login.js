import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { getUserDetaiels, Loginfun,Logoutfun } from '../Utiles/api';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()
  const navigates=useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
  
    try {
      console.log(email, password);
  
      const result = await Loginfun(email, password); // Wait for login to complete
  
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Token is available. Navigating to UserTable...');
        const results=await getUserDetaiels()
       if(results.user.role==="admin"){
        navigate('/Adminhome'); 
       }
       else if(results.user.role==="user"){
        navigates('/TaskManager')

       }


         // Navigate only after login success
      } else {
        console.log('Login failed. No token found.');
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };
  
  const handleLogout=()=>{
    console.log("logout");
    
    Logoutfun()
  }
  // const handleUser=()=>{
  //   console.log("userderta");
    
  //   getUserDetaiels()
  // }

  return (
    <>
      <h1
        style={{
          display: 'flex',
          paddingLeft: '650px',
          marginTop: '30px',
        }}
      >
        Login
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh', // Full height of the viewport
          backgroundColor: '#f8f9fa', // Optional: Add a light background
        }}
      >
        <Card style={{ width: '30rem', padding: '20px' }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Corrected
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Corrected
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
          {/* <Button type="submit" onClick={handleLogout} >logout</Button> */}
          {/* <Button type="submit" onClick={handleUser} >getuser</Button> */}


        </Card>
      </div>
    </>
  );
}

export default Login;
