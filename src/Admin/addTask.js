import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Addtask } from '../Utiles/api';
import { useParams,useNavigate } from 'react-router-dom';
function Addtasks() {
  const navigate=useNavigate('')
  const navigates=useNavigate('')


  const { users, project, projectid,username } = useParams(); // Get userId, project name, and projectId from URL
  console.log("User ID:", users);
  console.log("Project:", project);
  console.log("Project ID:", projectid);

  const [task, setTask] = useState('');
  const [tasknumber, setTasknumber] = useState(1); // Initialize tasknumber

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          // Call the Addtask function with task and tasknumber
          const result = await Addtask(users, projectid, task, tasknumber);
          console.log("Result:", result);
          navigate('/UserTable')

          // Increment the task number after successful task creation
          setTasknumber((prevTaskNumber) => prevTaskNumber + 1);

          // Reset the task input field
          setTask('');


      } catch (error) {
          console.error("Error adding task:", error);
      }
  };

  return (
      <>
            <h2 onClick={()=>{navigates('/Adminhome')}} style={{ textAlign: 'center', marginBottom: '20px' }}>Add Task Table</h2>
          <div
              style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '80vh',
                  backgroundColor: '#f8f9fa',
              }}
          >
              <Card style={{ width: '30rem', padding: '20px' }}>
                  <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3">
                          <Form.Label>Project</Form.Label>
                          <Form.Control
                              placeholder="Enter the project"
                              value={project}
                              disabled
                          />
                      </Form.Group>
                      <div>
                        <label>Name:</label>
                        <p style={{border:'2px solid gray'}}>{username}</p>
                      </div>

                      
                      <Form.Group className="mb-3">
                          <Form.Label>Task</Form.Label>
                          <Form.Control
                              placeholder="Enter the task"
                              value={task}
                              onChange={(e) => setTask(e.target.value)}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label>Task Number</Form.Label>
                          <Form.Control
                              type="number"
                              placeholder="Enter task number"
                              value={tasknumber}
                              onChange={(e) => setTasknumber(Number(e.target.value))}
                          />
                      </Form.Group>
                      <Button type="submit">Submit</Button>
                  </Form>
              </Card>
          </div>
      </>
  );
}

export default Addtasks;
