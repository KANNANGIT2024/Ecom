import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUserPlus, FaTasks, FaTable, FaUserFriends, FaUserCircle } from "react-icons/fa";
import { Logoutfun } from "../Utiles/api";

const Adminhome = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Logoutfun();
      navigate("/"); // Navigate to the login page after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Navbar
        bg="dark"
        variant="dark"
        className="flex-column"
        style={{ width: "250px", position: "fixed", height: "100%", overflowY: "auto" }}
      >
        <Navbar.Brand className="mx-3 my-4 text-center">Task Management</Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/Adduser" className="text-white">
            <FaUserPlus className="me-2" /> Add User
          </Nav.Link>
          <Nav.Link as={Link} to="/Addproject" className="text-white">
            <FaUserPlus className="me-2" /> Add project
          </Nav.Link>
          <Nav.Link as={Link} to="/UserTable" className="text-white">
            <FaUserFriends className="me-2" /> User Table
          </Nav.Link>
        </Nav>
      </Navbar>

      {/* Main Content */}
      <div style={{ marginLeft: "250px", width: "100%", overflowY: "auto" }}>
        {/* Header */}
        <Navbar bg="dark" variant="dark" className="d-flex justify-content-between px-3">
          <div />
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="user-profile-dropdown">
              <FaUserCircle size={30} color="white" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/UserProfile">User Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>

        {/* Nested Route Content */}
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
