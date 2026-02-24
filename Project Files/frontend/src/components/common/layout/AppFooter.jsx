import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <>
      <footer className="site-footer mt-auto border-top">
        <Container>
          <Row className="gy-4 py-4 align-items-center">
            
            {/* 1. Brand Section */}
            <Col xs={12} md={4} className="text-center text-md-start">
              <div className="footer-brand mb-1">
                Complaint<span className="text-primary">Registery</span>
              </div>
              <p className="text-muted smaller mb-0">
                Turning complaints into customer trust.
              </p>
            </Col>

            {/* 2. Quick Links (Center) */}
            <Col xs={12} md={4} className="text-center">
              <div className="d-flex justify-content-center gap-4">
                <Link to="/" className="footer-nav-link">Home</Link>
                <Link to="/signup" className="footer-nav-link">SignUp</Link>
                <Link to="/signin" className="footer-nav-link">SignIn</Link>
              </div>
            </Col>

            {/* 3. Copyright (End) */}
            <Col xs={12} md={4} className="text-center text-md-end">
              <span className="text-muted smaller">
                © {new Date().getFullYear()} ComplaintRegistery Inc. All rights reserved.
              </span>
            </Col>

          </Row>
        </Container>
      </footer>

      <style>
        {`
          .site-footer {
            background: #ffffff;
            border-top: 1px solid #f1f3f5 !important;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }

          .footer-brand {
            font-weight: 700;
            font-size: 1.1rem;
            letter-spacing: -0.02em;
            color: #1a1a1a;
          }

          .footer-nav-link {
            font-size: 0.85rem;
            font-weight: 500;
            color: #6c757d;
            text-decoration: none;
            transition: color 0.2s ease;
          }

          .footer-nav-link:hover {
            color: #0d6efd;
          }

          .smaller {
            font-size: 0.75rem;
            letter-spacing: 0.01em;
          }

          .hover-link:hover {
            color: #0d6efd !important;
          }

          .footer-bottom {
            border-color: #f8f9fa !important;
          }
            
          /* Ensures footer sticks to bottom if page content is short */
          #root {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      </style>
    </>
  );
};

export default AppFooter;