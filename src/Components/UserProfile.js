import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { getUserDetaiels } from '../Utiles/api';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const featchUserdetaiels = async () => {
      try {
        const result = await getUserDetaiels();
        console.log("getuserprofiles detaiels ",result);
       
        
        if (result) {
          setUserDetails(result.user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    featchUserdetaiels();
  }, []);

  return (
    <Card style={{ width: '100%', margin: '20px auto' }}>
      <Card.Header className="bg-primary text-white text-center">
        <h4>User Profile</h4>
      </Card.Header>
      <Card.Body>
        <Row>
     
          <Col md={8}>
            <h5>Name: {userDetails?.name || 'N/A'}</h5>
            <p><strong>Email:</strong> {userDetails?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> {userDetails?.phone || 'N/A'}</p>
          
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
