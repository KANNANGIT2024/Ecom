// import React from "react";

// import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

// const HomePage = () => {
//   return (
//     <Container>
//       <h1>Welcome to Task Management</h1>
//       <p>Select a section from the sidebar to navigate.</p>
//     </Container>
//   );
// };

// const SectionPage = ({ sectionName }) => (
//   <Container>
//     <h1>{sectionName}</h1>
//     <p>This is the {sectionName} page.</p>
//   </Container>
// );

// const Home = () => {
//   return (
//     <>
//       <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
//         <Container>
//           <Navbar.Brand className="mx-auto">Task Management</Navbar.Brand>
//           <Navbar.Toggle aria-controls="offcanvasNavbar" />
//           <Navbar.Offcanvas
//             id="offcanvasNavbar"
//             aria-labelledby="offcanvasNavbarLabel"
//             placement="end"
//           >
//             <Offcanvas.Header closeButton>
//               <Offcanvas.Title id="offcanvasNavbarLabel">Sidebar</Offcanvas.Title>
//             </Offcanvas.Header>
//             <Offcanvas.Body>
//               <Nav className="justify-content-end flex-grow-1 pe-3">
//                 <Nav.Link as={Link} to="/">Home</Nav.Link>
//                 <Nav.Link as={Link} to="/section1">Section 1</Nav.Link>
//                 <Nav.Link as={Link} to="/section2">Section 2</Nav.Link>
//                 <Nav.Link as={Link} to="/section3">Section 3</Nav.Link>
//               </Nav>
//             </Offcanvas.Body>
//           </Navbar.Offcanvas>
//         </Container>
//       </Navbar>
//       <div style={{ marginTop: "5rem" }}>
       
//       </div>
//       </>
  
//   );
// };

// export default Home;
