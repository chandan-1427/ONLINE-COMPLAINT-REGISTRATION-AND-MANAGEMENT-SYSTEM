import React from "react";
import { Card, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { FaPaperPlane, FaUser, FaMapMarkerAlt, FaPenNib, FaFileAlt } from "react-icons/fa";
import { useComplaintForm } from "./hooks/useComplaintForm";

// Import CSS Module
import styles from "./css/Complaint.module.css";

const Complaint = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { formData, handleChange, handleSubmit, loading } = useComplaintForm(user?._id);

  return (
    <Card className={styles.letterCard}>
      <Card.Body className="p-4 p-lg-5">
        
        {/* Official Letterhead Heading */}
        <div className={`${styles.letterHeader} d-flex justify-content-between align-items-center`}>
           <div>
              <h3 className="fw-bold mb-0" style={{ fontFamily: 'serif' }}>OFFICIAL COMPLAINT</h3>
              <small className="text-muted">FORM REF: #USR-{user?._id?.slice(-5).toUpperCase()}</small>
           </div>
           <FaFileAlt size={30} className="text-muted opacity-50" />
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            <Col lg={5}>
              <div className={styles.letterSectionTitle}>
                 <FaUser size={12}/> <small>Identification</small>
              </div>
              
              <Form.Group className="mb-4">
                <label className={styles.formalLabel}>Full Name of Requester</label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.g. John Doe"
                  className={`${styles.formalInput} shadow-none`}
                  required
                />
              </Form.Group>

              <div className={`${styles.letterSectionTitle} mt-5`}>
                 <FaMapMarkerAlt size={12}/> <small>Service Location</small>
              </div>

              <Form.Group className="mb-3">
                <label className={styles.formalLabel}>Mailing Address</label>
                <Form.Control
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street and House Number"
                  className={`${styles.formalInput} shadow-none`}
                  required
                />
              </Form.Group>

              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <label className={styles.formalLabel}>City</label>
                  <Form.Control
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`${styles.formalInput} shadow-none`}
                    required
                  />
                </Col>
                <Col xs={6} sm={3}>
                  <label className={styles.formalLabel}>State</label>
                  <Form.Control
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`${styles.formalInput} shadow-none`}
                    required
                  />
                </Col>
                <Col xs={6} sm={3}>
                  <label className={styles.formalLabel}>Zip</label>
                  <Form.Control
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`${styles.formalInput} shadow-none`}
                    required
                  />
                </Col>
              </Row>
            </Col>

            <Col lg={7}>
              <div className={styles.letterSectionTitle}>
                 <FaPenNib size={12}/> <small>Statement of Issue</small>
              </div>

              <Form.Group className="h-100 d-flex flex-column">
                <label className={styles.formalLabel}>Detailed Description</label>
                <Form.Control
                  as="textarea"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Type your official statement here..."
                  className={`${styles.formalTextarea} flex-grow-1 shadow-none`}
                  style={{ minHeight: "250px", resize: "none" }}
                  required
                />
                
                <div className={styles.buttonContainer}>
                  <Button
                    type="submit"
                    variant="dark"
                    className={`${styles.submitFormalBtn} d-inline-flex align-items-center justify-content-center gap-2 shadow-sm`}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner size="sm" />
                    ) : (
                      <>
                        <FaPaperPlane size={14} />
                        FILE COMPLAINT
                      </>
                    )}
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Complaint;