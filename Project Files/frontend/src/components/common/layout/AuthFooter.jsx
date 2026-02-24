import { Container, Row, Col } from 'react-bootstrap';
import { FaHeart, FaGithub, FaTwitter } from 'react-icons/fa';

export default function AuthFooter() {
  return (
    <>
      <footer className="footer-wrapper mt-auto border-top">
        <Container>
          <Row className="py-4 align-items-center gy-3">
            
            {/* 1. Brand & Tagline */}
            <Col xs={12} md={4} className="text-center text-md-start">
              <div className="brand-text">
                Complaint<span className="text-primary">Registery</span>
              </div>
              <p className="text-secondary smaller mb-0">
                Building trust through accountability.
              </p>
            </Col>

            {/* 2. Built with heart (Center) */}
            <Col xs={12} md={4} className="text-center">
              <span className="text-muted smaller">
                Made with <FaHeart className="text-danger mx-1" /> by Team C
              </span>
            </Col>

            {/* 3. Social & Rights (End) */}
            <Col xs={12} md={4} className="text-center text-md-end">
              <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-1">
                {/* Replaced <a> with <button> to fix ESLint anchor-is-valid warning */}
                <button type="button" className="social-icon-btn" aria-label="Twitter">
                  <FaTwitter />
                </button>
                <button type="button" className="social-icon-btn" aria-label="GitHub">
                  <FaGithub />
                </button>
              </div>
              <p className="text-muted smaller mb-0">
                &copy; {new Date().getFullYear()} All Rights Reserved.
              </p>
            </Col>

          </Row>
        </Container>
      </footer>

      <style>
        {`
          .footer-wrapper {
            background: #ffffff;
            border-top: 1px solid #f1f3f5 !important;
          }

          .brand-text {
            font-weight: 700;
            font-size: 1rem;
            letter-spacing: -0.01em;
            color: #1a1a1a;
          }

          .smaller {
            font-size: 0.8rem;
            letter-spacing: 0.01em;
          }

          .social-icon-btn {
            background: none;
            border: none;
            padding: 0;
            color: #adb5bd;
            transition: all 0.2s ease;
            font-size: 1.1rem;
            cursor: pointer;
          }

          .social-icon-btn:hover {
            color: #0d6efd;
            transform: translateY(-2px);
          }

          /* Sticky Footer Support */
          #root {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      </style>
    </>
  );
}