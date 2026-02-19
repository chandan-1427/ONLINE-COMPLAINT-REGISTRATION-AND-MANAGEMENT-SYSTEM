import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap"; // ✅ Added Alert

import PageContainer from "../layout/PageContainer";
import AppNavbar from "../layout/AppNavbar";
import AppFooter from "../layout/AppFooter";

import AuthCard from "../common/AuthCard";
import FormInput from "../common/FormInput";
import PasswordInput from "../common/PasswordInput";
import PrimaryButton from "../common/PrimaryButton";

import signinImage from "../../../Images/signin.png";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // ✅ Added State for Feedback Messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    // Clear error when user starts typing
    if (error) setError("");
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/Login",
        user
      );

      // ✅ Success Feedback
      setSuccess("Login successful! Redirecting...");
      localStorage.setItem("user", JSON.stringify(res.data));

      const { userType } = res.data;

      // Small delay for better UX before navigation
      setTimeout(() => {
        switch (userType) {
          case "Admin":
            navigate("/admin");
            break;
          case "Ordinary":
            navigate("/homepage");
            break;
          case "Agent":
            navigate("/agent");
            break;
          default:
            navigate("/login");
        }
      }, 1000);

    } catch (err) {
      // ✅ Dynamic Error Handling
      if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 404) {
        setError("Account not found. Please sign up first.");
      } else {
        setError("Could not connect to the server. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <AppNavbar />

      <div className="flex-grow-1 d-flex align-items-center bg-light py-4">
        <Container>
          <Row className="align-items-center justify-content-center g-4">

            {/* Illustration */}
            <Col lg={6} className="d-none d-lg-flex justify-content-center">
              <img
                src={signinImage}
                alt="Sign In Illustration"
                className="img-fluid floating-animation"
                style={{
                  maxHeight: "400px",
                  objectFit: "contain"
                }}
              />
            </Col>

            {/* Form */}
            <Col xs={12} md={8} lg={6} xl={5}>
              <AuthCard
                title="Welcome Back"
                subtitle="Login to access your complaint dashboard"
              >
                
                {/* ✅ Inline Feedback Alerts */}
                {error && (
                  <Alert variant="danger" className="small py-2 px-3 border-0 shadow-sm rounded-3 mb-4">
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert variant="success" className="small py-2 px-3 border-0 shadow-sm rounded-3 mb-4">
                    {success}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>

                  <FormInput
                    label="Email Address"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    disabled={loading || success}
                  />

                  <PasswordInput
                    label="Password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                    disabled={loading || success}
                  />

                  <PrimaryButton
                    size="lg"
                    className="w-100 mt-4"
                    type="submit"
                    disabled={loading || success}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </PrimaryButton>

                </form>

                <p className="mt-4 mb-0 text-muted text-center small">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Sign Up
                  </Link>
                </p>

              </AuthCard>
            </Col>

          </Row>
        </Container>
      </div>

      <AppFooter />
    </PageContainer>
  );
};

export default Login;