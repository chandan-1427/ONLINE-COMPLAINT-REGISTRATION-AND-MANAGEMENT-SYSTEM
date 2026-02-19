import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

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
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            Hi Admin {userName}
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">

              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `nav-link text-light ${isActive ? "active" : ""}`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `nav-link text-light ${isActive ? "active" : ""}`
                }
              >
                Users
              </NavLink>

              <NavLink
                to="/admin/agents"
                className={({ isActive }) =>
                  `nav-link text-light ${isActive ? "active" : ""}`
                }
              >
                Agents
              </NavLink>

            </Nav>

            <Button variant="outline-danger" onClick={handleLogout}>
              Log out
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
