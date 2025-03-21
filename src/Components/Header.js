// Header.js (React component for the header section)

import React from 'react';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Header = () => {
    const navigate = useNavigate(); // Use useNavigate hook

    // Function to handle navigation when an option is selected
    const handleNavigation = (path) => {
        navigate(path);  // Navigate to the selected page
    };

    return (
        <Navbar bg="light" expand="lg">
            {/* Centering the Title */}
            <Navbar.Brand className="mx-auto" style={{ textAlign: 'center', flexGrow: 1 }}>
                Sample
            </Navbar.Brand>

            {/* Dropdown in the top-right corner */}
            <Nav className="ml-auto">
                <DropdownButton
                    align="end" // Align dropdown to the right
                    title="Select Option"
                    id="dropdown-custom-components"
                    variant="outline-secondary"
                >
                    <Dropdown.Item onClick={() => handleNavigation('/Adduser')}>Adduser</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavigation('/page2')}>Page 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavigation('/page3')}>Page 3</Dropdown.Item>
                </DropdownButton>
            </Nav>
        </Navbar>
    );
};

export default Header;
