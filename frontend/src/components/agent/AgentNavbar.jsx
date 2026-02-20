import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaUserShield, FaSignOutAlt, FaClipboardList, FaCircle } from 'react-icons/fa';

// Import CSS Module
import styles from './css/AgentNavbar.module.css';

const AgentNavbar = ({ userName, onLogout }) => {
  return (
    <Navbar expand="lg" sticky="top" className={`${styles.agentNavbar} py-2 shadow-sm`}>
      <Container fluid className="px-md-4">
        <Navbar.Brand className={styles.brandCustom}>
          <div className="bg-info text-white p-2 rounded-3 d-flex align-items-center">
            <FaUserShield size={18} />
          </div>
          <span>Agent<span className="text-info">Portal</span></span>
        </Navbar.Brand>

        <Navbar.Toggle className="border-0 shadow-none p-0">
          <div className="p-2 bg-light rounded-2">
            <span className="navbar-toggler-icon" style={{ width: '1.2em', height: '1.2em' }}></span>
          </div>
        </Navbar.Toggle>

        <Navbar.Collapse id="agent-nav" className={styles.collapseContent}>
          <Nav className={`${styles.mobileNavRow} me-auto ms-lg-4`}>
            <NavLink 
              to="/agent" 
              end 
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? 'active-link-global' : ''}`
              }
            >
              <FaClipboardList size={16} /> <span>View Complaints</span>
            </NavLink>
          </Nav>

          <div className={`${styles.mobileUserSection} d-lg-flex flex-lg-row align-items-lg-center gap-lg-3`}>
            <div className={styles.userProfileBadge}>
              <FaCircle className="text-success" size={8} />
              <span>Hi, {userName}</span>
            </div>

            <Button 
              variant="outline-danger" 
              size="sm" 
              className={`${styles.logoutBtnMobile} rounded-pill px-4 fw-bold d-flex align-items-center gap-2 shadow-none`}
              onClick={onLogout}
            >
              <FaSignOutAlt size={14} /> 
              <span>Logout</span>
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AgentNavbar;