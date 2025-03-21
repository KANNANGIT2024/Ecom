import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Addprojects, getAllUsers } from '../Utiles/api'; 
import { useNavigate } from 'react-router-dom';
function Addproject() {
  const [project, setProject] = useState(''); 
  const [projectNumber, setProjectNumber] = useState(0); 
  const [users, setUsers] = useState([]); 
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
const navigates=useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers(); 
        if (result && Array.isArray(result) && result.length > 0) {
          const allUsers = result.map(item => item.user); 
          console.log("All User details:", allUsers);
          setUsers(allUsers); 
        } else {
          setError('No users found');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  const handleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Prepare the project data to send to the backend
        const projectData = {
            project,        // Project name
            users: selectedUsers, // Selected user IDs as an array
        };

        console.log("Submitting project data:", projectData);

        // Call the Addprojects API function
        const result = await Addprojects(projectData);

        console.log("Result:", result);

        // Reset state after successful submission
        setProject('');
        setSelectedUsers([]);
    } catch (error) {
        console.error("Error adding project:", error);
    }
};



  const handleClear = () => {
    setProject(''); // Reset project value when Clear button is clicked
  };

  return (
    <>
      <h2 onClick={()=>{navigates('/Adminhome')}} style={{ textAlign: 'center', marginBottom: '20px' }}>Addprojects</h2>
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
          {loading && <p>Loading users...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><strong>Project Title:</strong></Form.Label>
              <Form.Control
                placeholder="Enter the project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
            </Form.Group>

            {/* Clear Button for Project */}
            {/* <Button variant="secondary" onClick={handleClear} style={{ marginBottom: '15px' }}>
              Clear Project
            </Button> */}

            <Form.Group className="mb-3">
              <Form.Label><strong>Select Users:</strong></Form.Label>
              {users.length > 0 ? (
                users.map((user) => (
                  <Form.Check
                    key={user._id}
                    type="checkbox"
                    label={user.name}
                    value={user._id}
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleUserSelection(user._id)}
                  />
                ))
              ) : (
                <p>No users available</p>
              )}
            </Form.Group>

            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Addproject;
