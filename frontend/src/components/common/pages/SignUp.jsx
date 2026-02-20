import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap"; // ✅ Imported Alert

import PageContainer from "../layout/PageContainer";
import AppNavbar from "../layout/AppNavbar";
import AppFooter from "../layout/AppFooter";

import AuthCard from "../common/AuthCard";
import FormInput from "../common/FormInput";
import PasswordInput from "../common/PasswordInput";
import UserTypeDropdown from "../common/UserTypeDropdown";
import PrimaryButton from "../common/PrimaryButton";

import signupImage from "../../../Images/signin.png";

const SignUp = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Select User Role");
  const [loading, setLoading] = useState(false);
  
  // ✅ Added State for Feedback Messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: ""
  });

  const handleChange = (e) => {
    // Clear errors when the user starts typing again
    if (error) setError(""); 
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTitle = (selected) => {
    if (error) setError("");
    setTitle(selected);
    setUser((prev) => ({ ...prev, userType: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError("");
    setSuccess("");

    // 1. Validation
    if (!user.userType || user.userType === "Select User Role") {
      return setError("Please select an account type to continue.");
    }

    try {
      setLoading(true);

      // 2. API Call
      await axios.post("http://localhost:8000/api/auth/signup", user);

      // 3. Success Handling
      setSuccess("Account created successfully! Redirecting to login...");
      
      // Delay navigation so the user can read the success message
      setTimeout(() => {
        navigate("/signin");
      }, 2000);

    } catch (err) {
      // 4. Error Handling
      // Check if the backend sent a specific error message (e.g., "Email already exists")
      const backendError = err.response?.data?.message;
      setError(backendError || "Failed to create account. Please try again later.");
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
            
            {/* Illustration Column */}
            <Col lg={6} className="d-none d-lg-flex justify-content-center">
              <img
                src={signupImage}
                alt="Sign Up Illustration"
                className="img-fluid floating-animation"
                style={{
                  maxHeight: "400px",
                  objectFit: "contain"
                }}
              />
            </Col>

            {/* Form Column */}
            <Col xs={12} md={10} lg={6} xl={5}>
              <AuthCard
                title="Create Account"
                subtitle="Join us to submit and manage your complaints."
              >
                
                {/* ✅ Professional Alert Messages */}
                {error && (
                  <Alert variant="danger" className="small py-2 px-3 border-0 shadow-sm rounded-3">
                    <i className="bi bi-exclamation-circle me-2"></i> {/* Optional: Bootstrap icon */}
                    {error}
                  </Alert>
                )}
                
                {success && (
                  <Alert variant="success" className="small py-2 px-3 border-0 shadow-sm rounded-3">
                    <i className="bi bi-check-circle me-2"></i>
                    {success}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Row className="gx-3">

                    {/* Full Width: Name */}
                    <Col xs={12}>
                      <FormInput
                        label="Full Name"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        disabled={loading || success} // Disable while loading or success
                      />
                    </Col>

                    {/* Half Width: Email & Phone */}
                    <Col xs={12} md={6}>
                      <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        disabled={loading || success}
                      />
                    </Col>

                    <Col xs={12} md={6}>
                      <FormInput
                        label="Mobile Number"
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        required
                        disabled={loading || success}
                      />
                    </Col>

                    {/* Half Width: Password & Role */}
                    <Col xs={12} md={6}>
                      <PasswordInput
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        disabled={loading || success}
                      />
                    </Col>

                    <Col xs={12} md={6} className="d-flex flex-column justify-content-center mb-3 mb-md-0">
                      <div className="mt-md-1">
                        <UserTypeDropdown
                          title={title}
                          onSelect={handleTitle}
                          disabled={loading || success}
                        />
                      </div>
                    </Col>

                  </Row>

                  <PrimaryButton
                    size="lg"
                    className="w-100 mt-4"
                    type="submit"
                    disabled={loading || success} // Prevent double clicking
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </PrimaryButton>
                </form>

                <p className="mt-4 mb-0 text-muted text-center small">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-primary text-decoration-none fw-semibold"
                  >
                    Sign in here
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

export default SignUp;