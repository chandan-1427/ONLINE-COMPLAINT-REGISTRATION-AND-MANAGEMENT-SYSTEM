import { Modal, Form, Button, Spinner } from "react-bootstrap";

const EditUserModal = ({ show, onHide, data, onChange, onSave, processing, title }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton className="border-0 pb-0">
      <Modal.Title className="fw-bold fs-5">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="p-4">
      <Form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-secondary">Full Name</Form.Label>
          <Form.Control name="name" value={data.name} onChange={onChange} className="bg-light border-0 shadow-none" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-secondary">Email Address</Form.Label>
          <Form.Control type="email" name="email" value={data.email} onChange={onChange} className="bg-light border-0 shadow-none" required />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="small fw-bold text-secondary">Phone Number</Form.Label>
          <Form.Control name="phone" value={data.phone} onChange={onChange} className="bg-light border-0 shadow-none" required />
        </Form.Group>
        <div className="d-flex gap-2">
          <Button variant="light" className="w-100 fw-bold" onClick={onHide}>Cancel</Button>
          <Button variant="primary" type="submit" className="w-100 fw-bold" disabled={processing}>
            {processing ? <Spinner size="sm" /> : "Save Changes"}
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
);

export default EditUserModal;