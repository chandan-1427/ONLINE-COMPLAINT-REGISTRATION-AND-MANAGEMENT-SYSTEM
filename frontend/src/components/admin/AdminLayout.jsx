import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaUserShield, FaSignOutAlt, FaChartPie, FaUsers, FaUserCog, FaCircle } from "react-icons/fa";
import AuthFooter from "../common/layout/AuthFooter";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.userType !== "Admin") {
      navigate("/");
    } else {
      setUserName(user.name);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <style>{`
        .admin-navbar {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #eef2f6;
        }

        .navbar-brand-custom {
          font-weight: 700;
          letter-spacing: -0.5px;
          color: #1e293b;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-nav-link {
          font-size: 0.88rem;
          font-weight: 600;
          color: #64748b;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }

        .admin-nav-link:hover {
          color: #3b82f6;
          background: #f1f5f9;
        }

        .active-link {
          color: #3b82f6 !important;
          background: #eff6ff !important;
        }

        /* Fixed user badge to prevent content jumping */
        .user-profile-badge {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 991px) {
          .navbar-collapse {
            background: #ffffff;
            margin: 0 -1rem;
            padding: 1rem;
            border-bottom: 1px solid #eee;
            /* Prevents height jumping during animation */
            overflow: hidden; 
          }

          .mobile-nav-row {
            flex-direction: row !important;
            overflow-x: auto;
            padding-bottom: 10px;
            margin-bottom: 10px;
            scrollbar-width: none; 
          }
          
          .mobile-nav-row::-webkit-scrollbar { display: none; }

          .admin-nav-link {
            padding: 10px 15px;
            font-size: 0.9rem;
            flex-shrink: 0;
          }

          /* Stabilized Mobile User Section */
          .mobile-user-section {
            background: #f8fafc;
            border-radius: 12px;
            padding: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: stretch !important; /* Forces stable width */
            gap: 10px;
          }

          .user-profile-badge {
            justify-content: center;
            border: none;
            background: transparent;
          }
            
          .logout-btn-mobile {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
          }
        }
      `}</style>

      <Navbar expand="lg" sticky="top" className="admin-navbar py-2 shadow-sm">
        <Container fluid className="px-md-4">
          <Navbar.Brand className="navbar-brand-custom">
            <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center">
              <FaUserShield size={18} />
            </div>
            <span>Admin<span className="text-primary">Care</span></span>
          </Navbar.Brand>

          <Navbar.Toggle className="border-0 shadow-none p-0">
            <div className="p-2 bg-light rounded-2">
              <span className="navbar-toggler-icon" style={{ width: '1.2em', height: '1.2em' }}></span>
            </div>
          </Navbar.Toggle>

          <Navbar.Collapse id="admin-nav">
            <Nav className="me-auto ms-lg-4 gap-2 mobile-nav-row">
              <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link ${isActive ? "active-link" : ""}`}>
                <FaChartPie size={16} /> <span>Dashboard</span>
              </NavLink>

              <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-link ${isActive ? "active-link" : ""}`}>
                <FaUsers size={18} /> <span>Users</span>
              </NavLink>

              <NavLink to="/admin/agents" className={({ isActive }) => `admin-nav-link ${isActive ? "active-link" : ""}`}>
                <FaUserCog size={18} /> <span>Agents</span>
              </NavLink>
            </Nav>

            {/* ✅ Wrapped in a stable container to prevent shaking */}
            <div className="mobile-user-section d-lg-flex flex-lg-row align-items-lg-center gap-lg-3">
              <div className="user-profile-badge">
                <FaCircle className="text-success" size={8} />
                <span>Hi, {userName}</span>
              </div>

              <Button 
                variant="outline-danger" 
                size="sm" 
                className="rounded-pill px-4 fw-bold d-flex align-items-center gap-2 logout-btn-mobile shadow-none"
                onClick={handleLogout}
              >
                <FaSignOutAlt size={14} /> 
                <span>Logout</span>
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="flex-grow-1">
        <Container fluid className="px-md-4 py-4">
          <Outlet />
        </Container>
      </div>

      <AuthFooter />
    </div>
  );
};

export default AdminLayout;