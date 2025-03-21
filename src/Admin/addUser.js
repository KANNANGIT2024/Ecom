import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Addadminfun } from '../Utiles/api';
import { useNavigate } from "react-router-dom";


function Adduser() {
  const navigate=useNavigate('')
  const navigates=useNavigate('')


    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    // const[mobileNumber,setMobileNumber]=useState(0)

const handleSubmit=(e)=>{
try {
    e.preventDefault(); 

    

    const result=Addadminfun(name,email,password)
    
    if(result){
    console.log(result);
navigate('/Adminhome')

    }
    
} catch (error) {
    console.log(error);
    
}
    
    

}


  return (
    <>
    <h2 onClick={()=>{navigates('/Adminhome')}} style={{ textAlign: 'center', marginBottom: '20px' }}>Adduser</h2>
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
            <Form.Label style={{justifyContent:'center'}} >Name</Form.Label>
            <Form.Control  placeholder="enter your Name" onChange={(e)=> setName(e.target.value)}  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{justifyContent:'center'}} >Email</Form.Label>
            <Form.Control  placeholder="enter your email" onChange={(e)=> setEmail(e.target.value)}  />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{justifyContent:'center'}} >Password</Form.Label>
            <Form.Control  placeholder="enter your Password" onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>
          {/* <Form.Group className="mb-3">
            <Form.Label style={{justifyContent:'center'}} >Phonenumber</Form.Label>
            <Form.Control  placeholder="enter your phonenumber" onChange={(e)=>setMobileNumber(e.target.value)}/>
          </Form.Group> */}
          
          {/* <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="disabledFieldsetCheck"
              label="Can't check this"
            />
          </Form.Group> */}
          <Button type="submit">Submit</Button>
        
      </Form>
    </Card>
  </div>
  </>
    
  );
}

export default Adduser;
