import { Modal, Button, Spinner } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

const DeleteConfirmationModal = ({ show, onHide, onConfirm, itemName, processing, itemType = "User" }) => (
  <Modal show={show} onHide={() => !processing && onHide()} centered size="sm">
    <Modal.Body className="text-center p-4">
      <div className="text-danger mb-3"><FaTrashAlt size={32} /></div>
      <h6 className="fw-bold">Confirm Deletion</h6>
      <p className="small text-muted mb-4">Remove <strong>{itemName}</strong> from the system?</p>
      <div className="d-grid gap-2">
        <Button variant="danger" size="sm" className="fw-bold" onClick={onConfirm} disabled={processing}>
          {processing ? <Spinner size="sm" /> : `Delete ${itemType}`}
        </Button>
        <Button variant="link" size="sm" className="text-muted text-decoration-none" onClick={onHide} disabled={processing}>
          Cancel
        </Button>
      </div>
    </Modal.Body>
  </Modal>
);

export default DeleteConfirmationModal;