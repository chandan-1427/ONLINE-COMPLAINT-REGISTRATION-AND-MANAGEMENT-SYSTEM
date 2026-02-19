import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const AgentNavbar = ({ userName, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand>
          Hi Agent <span className="text-info">{userName}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={NavLink} to="/agent">
              View Complaints
            </Nav.Link>
          </Nav>
          <Button onClick={onLogout} variant="outline-danger">
            Log out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AgentNavbar;