import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import PageContainer from "../layout/PageContainer";
import AppNavbar from "../layout/AppNavbar";
import AppFooter from "../layout/AppFooter";
import HeroSection from "../common/HeroSection";
import PrimaryButton from "../common/PrimaryButton";

import Image1 from "../../../Images/Image1.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="ComplaintCare | Complaint Management Platform">
      <AppNavbar />

      {/* ================= HERO ================= */}
      <HeroSection
        image={Image1}
        title={
          <h1 className="display-6 fw-semibold lh-sm mb-3">
            Resolve Complaints Faster.
            <br />
            <span className="text-primary">
              Build Trust Automatically.
            </span>
          </h1>
        }
        description={
          <p className="text-muted fs-6 mb-4" style={{ maxWidth: "520px" }}>
            ComplaintCare helps teams manage complaints efficiently with
            structured workflows, real-time tracking, and clear accountability.
          </p>
        }
        cta={
          <div className="d-flex flex-column flex-sm-row gap-2">
            <PrimaryButton
              onClick={() => navigate("/signup")}
              className="px-4 py-2"
            >
              Start Free
            </PrimaryButton>

            <button
              className="btn btn-light border px-4 py-2"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </div>
        }
      />

      {/* ================= STATS ================= */}
      <section className="py-4 border-top">
        <Container>
          <Row className="text-center gy-3">
            <Col md={4}>
              <div>
                <h5 className="fw-semibold mb-1">98%</h5>
                <small className="text-muted">
                  Customer Satisfaction
                </small>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <h5 className="fw-semibold mb-1">1K+</h5>
                <small className="text-muted">
                  Complaints Resolved
                </small>
              </div>
            </Col>
            <Col md={4}>
              <div>
                <h5 className="fw-semibold mb-1">24/7</h5>
                <small className="text-muted">
                  Real-Time Monitoring
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-4">
            <h2 className="h4 fw-semibold mb-2">
              Designed for Efficient Complaint Resolution
            </h2>
            <p className="text-muted small">
              Tools built for clarity, accountability, and speed.
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title className="h6 fw-semibold mb-2">
                    Structured Tracking
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    Track each complaint from submission to resolution
                    with complete transparency.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title className="h6 fw-semibold mb-2">
                    Workflow Automation
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    Automatically assign tasks and notify teams to
                    eliminate manual follow-ups.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Card.Title className="h6 fw-semibold mb-2">
                    Insightful Analytics
                  </Card.Title>
                  <Card.Text className="text-muted small">
                    Identify trends and improve performance using
                    real-time dashboards.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= TRUST SECTION ================= */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <h3 className="fw-semibold mb-3">
                Built for Secure & Scalable Operations
              </h3>

              <ul className="text-muted small ps-3">
                <li className="mb-2">
                  Role-based access control
                </li>
                <li className="mb-2">
                  Enterprise-grade security
                </li>
                <li className="mb-2">
                  Seamless system integrations
                </li>
                <li>
                  Performance optimized infrastructure
                </li>
              </ul>
            </Col>

            <Col md={6}>
              <img
                src={Image1}
                alt="ComplaintCare dashboard preview"
                className="img-fluid rounded shadow-sm"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-5 border-top">
        <Container className="text-center">
          <h3 className="fw-semibold mb-3">
            Ready to streamline complaint management?
          </h3>

          <p className="text-muted small mb-4">
            Start improving resolution time and customer trust today.
          </p>

          <PrimaryButton
            onClick={() => navigate("/signup")}
            className="px-4 py-2"
          >
            Create Free Account
          </PrimaryButton>
        </Container>
      </section>

      <AppFooter />
    </PageContainer>
  );
};

export default Home;
