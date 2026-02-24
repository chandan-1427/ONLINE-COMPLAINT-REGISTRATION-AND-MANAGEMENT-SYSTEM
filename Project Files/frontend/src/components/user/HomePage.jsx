import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaPlusCircle, FaSearch, FaSignOutAlt, FaCircle, FaPenNib } from "react-icons/fa";
import AuthFooter from "../common/layout/AuthFooter";
import Complaint from "../user/Complaint";
import Status from "../user/Status";

// Import CSS Module
import styles from "./css/HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState("Complaint");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.name);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* ✅ Formal Burgundy Letterhead Navbar */}
      <Navbar expand="lg" sticky="top" className={`${styles.userNavbar} shadow-sm`}>
        <Container fluid className="px-md-5">
          <Navbar.Brand className={styles.brandCustom}>
            <div style={{ color: "#800020" }}>
              <FaPenNib size={22} />
            </div>
            <span>Complaint<span style={{ color: "#800020" }}>Registry</span></span>
          </Navbar.Brand>

          <Navbar.Toggle className="border-0 shadow-none">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="user-nav" className={styles.navbarCollapse}>
            <Nav className={`${styles.mobileNavRow} me-auto ms-lg-4`}>
              <Nav.Link 
                className={`${styles.navLink} ${activeComponent === 'Complaint' ? styles.activeNavLink : ''}`}
                onClick={() => setActiveComponent('Complaint')}
              >
                <FaPlusCircle size={14} /> <span>New Complaint</span>
              </Nav.Link>

              <Nav.Link 
                className={`${styles.navLink} ${activeComponent === 'Status' ? styles.activeNavLink : ''}`}
                onClick={() => setActiveComponent('Status')}
              >
                <FaSearch size={14} /> <span>Status</span>
              </Nav.Link>
            </Nav>

            <div className="d-flex flex-column flex-lg-row align-items-center gap-2">
              <div className={styles.userProfileBadge}>
                <FaCircle className="text-success me-2" size={6} />
                <span>Signed as: <strong>{userName}</strong></span>
              </div>

              <Button 
                variant="dark" 
                size="sm" 
                className="rounded-1 px-4 fw-bold shadow-none"
                style={{
                  letterSpacing: '1px', 
                  fontSize: '0.75rem',
                  backgroundColor: "#222",
                  border: "none"
                }}
                onClick={handleLogout}
              >
                <FaSignOutAlt size={12} className="me-2" /> 
                LOGOUT
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className={styles.letterThemeBody}>
        <Container className="py-4 pb-md-5">
          {activeComponent === "Complaint" ? <Complaint /> : <Status />}
        </Container>
      </div>

      <AuthFooter />
    </div>
  );
};

export default HomePage;