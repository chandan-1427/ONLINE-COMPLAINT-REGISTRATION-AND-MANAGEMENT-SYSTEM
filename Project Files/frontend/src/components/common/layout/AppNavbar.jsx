import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./AppNavbar.css"; 

const AppNavbar = () => {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="bg-white border-bottom py-2"
    >
      <Container>

        {/* Brand */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-semibold text-dark"
          style={{ fontSize: "1.1rem", letterSpacing: "0.3px" }}
        >
          Complaint<span className="text-primary">Registery</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar"
          className="border-0 shadow-none"
        />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-3 mt-3 mt-lg-0 text-center text-lg-start">

            <Nav.Link
              as={NavLink}
              to="/"
              className="nav-hover small px-2"
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/signup"
              className="nav-hover small px-2"
            >
              Sign Up
            </Nav.Link>

            <div className="mt-2 mt-lg-0">
              <Button
                as={NavLink}
                to="/signin"
                size="sm"
                className="px-3 py-1 rounded-3 border nav-btn-hover"
                variant="outline-dark"
              >
                Login
              </Button>
            </div>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default AppNavbar;
