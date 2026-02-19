import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
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
    <div className="d-flex flex-column min-vh-100">

      {/* Navbar */}
      <Navbar
        expand="lg"
        className="bg-white border-bottom shadow-sm py-3"
        sticky="top"
      >
        <Container fluid className="px-4">
          <Navbar.Brand className="fw-semibold text-dark">
            Admin Panel
          </Navbar.Brand>

          <Navbar.Toggle className="border-0 shadow-none" />

          <Navbar.Collapse>

            <Nav className="me-auto ms-lg-4 gap-lg-3 mt-4 mt-lg-0 text-center text-lg-start">

              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "active-link" : ""}`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "active-link" : ""}`
                }
              >
                Users
              </NavLink>

              <NavLink
                to="/admin/agents"
                className={({ isActive }) =>
                  `admin-nav-link ${isActive ? "active-link" : ""}`
                }
              >
                Agents
              </NavLink>

            </Nav>

            <div className="mobile-divider d-lg-none my-3"></div>

            <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
              <span className="text-muted small text-center text-lg-start">
                Hi, <strong>{userName}</strong>
              </span>

              <Button
                variant="outline-dark"
                size="sm"
                className="rounded-3 w-100 w-lg-auto"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Page Content */}
      <div className="flex-grow-1 admin-content">
        <Container fluid className="px-4 py-4">
          <Outlet />
        </Container>
      </div>

      {/* Footer */}
      <AuthFooter />

      {/* Internal Styling */}
      <style>
        {`
          .admin-nav-link {
            text-decoration: none;
            color: #666;
            font-weight: 500;
            transition: all 0.2s ease;
            padding: 6px 0;
          }

          .admin-nav-link:hover {
            color: #000;
          }

          .active-link {
            color: #000;
            border-bottom: 2px solid #000;
          }

          .admin-content {
            background-color: #f8f9fa;
          }

          @media (max-width: 991px) {
            .admin-nav-link {
              display: block;
              padding: 10px 0;
            }

            .active-link {
              border-bottom: none;
              font-weight: 600;
            }

            .mobile-divider {
              height: 1px;
              background: #eee;
              width: 100%;
            }
          }
        `}
      </style>

    </div>
  );
};

export default AdminLayout;
