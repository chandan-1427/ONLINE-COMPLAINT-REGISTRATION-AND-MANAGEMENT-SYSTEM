import { Container, Row, Col } from "react-bootstrap";

const HeroSection = ({
  image,
  title,
  highlight,
  description,
  cta
}) => {
  return (
    <Container className="flex-grow-1 d-flex align-items-center py-5">
      <Row className="align-items-center gy-4 gy-lg-5">
        
        {/* DESKTOP IMAGE: Only visible on Large screens and up (lg) */}
        <Col lg={6} className="text-center d-none d-lg-block">
          <img
            src={image}
            alt="Hero Illustration"
            className="img-fluid floating-animation"
            style={{ maxHeight: "450px" }}
          />
        </Col>

        {/* CONTENT COLUMN */}
        <Col lg={6} className="ps-lg-5 text-center text-lg-start">
          {/* 1. Title */}
          <h1 className="display-5 display-md-4 fw-bold mb-3 text-dark">
            {title} <br />
            <span className="text-primary">{highlight}</span>
          </h1>

          {/* 2. Description */}
          <p className="lead text-secondary mb-4">
            {description}
          </p>

          {/* 3. MOBILE IMAGE: Only visible on screens smaller than Large */}
          <div className="d-lg-none mb-4">
            <img
              src={image}
              alt="Hero Illustration"
              className="img-fluid"
              style={{ maxHeight: "300px" }}
            />
          </div>

          {/* 4. Call to Action */}
          <div className="cta-wrapper">
            {cta}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;