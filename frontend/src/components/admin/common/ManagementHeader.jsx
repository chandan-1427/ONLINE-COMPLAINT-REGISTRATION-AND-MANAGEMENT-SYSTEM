import { Badge } from "react-bootstrap";

const ManagementHeader = ({ title, subtitle, count }) => (
  <div className="d-flex justify-content-between align-items-center mb-4 px-1">
    <div>
      <h5 className="fw-bold mb-0">{title}</h5>
      <small className="text-muted">{subtitle}</small>
    </div>
    <Badge bg="primary" className="px-3 py-2 rounded-pill shadow-sm">
      {count} Total
    </Badge>
  </div>
);

export default ManagementHeader;