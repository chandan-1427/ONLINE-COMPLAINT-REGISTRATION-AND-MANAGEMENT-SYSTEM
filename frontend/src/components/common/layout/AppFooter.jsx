import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const AppFooter = () => {
  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <Container>
        <Row className="align-items-center text-center text-md-start">

          {/* Brand */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">
              Complaint<span className="text-primary">Care</span>
            </h5>
            <small className="text-secondary">
              Turning complaints into customer trust.
            </small>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3 mb-md-0">
            <div className="d-flex justify-content-center">
              <Link to="/" className="text-light text-decoration-none mx-3">
                Home
              </Link>
              <Link to="/signup" className="text-light text-decoration-none mx-3">
                SignUp
              </Link>
              <Link to="/signin" className="text-light text-decoration-none mx-3">
                SignIn
              </Link>
            </div>
          </Col>

          {/* Copyright */}
          <Col md={4} className="text-md-end">
            <small className="text-secondary">
              © {new Date().getFullYear()} ComplaintCare. All rights reserved.
            </small>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
