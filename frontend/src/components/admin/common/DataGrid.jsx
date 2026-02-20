import { Table, Card, Badge, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const DataGrid = ({ data, columns, onEdit, onDelete, renderIcon, badgeText }) => {
  return (
    <>
      {/* 💻 Desktop Table View: Hidden on small screens, shown on md and up */}
      <div className="d-none d-md-block">
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Table hover className="mb-0 align-middle">
            <thead className="bg-light border-bottom text-uppercase small fw-bold text-muted">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className={idx === 0 ? "ps-4 py-3" : ""}>{col.label}</th>
                ))}
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="ps-4 py-3 fw-bold text-dark">
                    {renderIcon} {item.name}
                  </td>
                  <td className="text-muted small">
                    <div>{item.email}</div>
                    <div className="smaller">{item.phone}</div>
                  </td>
                  <td><Badge bg="secondary" pill className="px-3">{badgeText}</Badge></td>
                  <td className="text-end pe-4">
                    <Button variant="light" size="sm" className="border rounded-pill px-3 me-2 fw-medium text-secondary" onClick={() => onEdit(item)}>
                      <FaEdit className="me-1" /> Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" className="rounded-pill px-3 fw-medium" onClick={() => onDelete(item)}>
                      <FaTrashAlt className="me-1" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>

      {/* 📱 Mobile Card View: Shown on small screens, hidden on md and up */}
      <div className="d-md-none">
        <style>{`
          .user-card-mobile { background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 12px; border: 1px solid #eee; }
          .mobile-actions { display: flex; gap: 8px; margin-top: 15px; border-top: 1px solid #f8f9fa; padding-top: 12px; }
          .mobile-actions button { flex: 1; }
        `}</style>
        {data.map((item) => (
          <div key={item._id} className="user-card-mobile">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">{renderIcon}</div>
              <div>
                <div className="fw-bold text-dark">{item.name}</div>
                <Badge bg="secondary" pill className="smaller">{badgeText.toUpperCase()}</Badge>
              </div>
            </div>
            <div className="small text-muted mb-1"><FaEnvelope className="me-2" />{item.email}</div>
            <div className="small text-muted"><FaPhoneAlt className="me-2" />{item.phone}</div>
            <div className="mobile-actions">
              <Button variant="light" size="sm" className="border fw-bold" onClick={() => onEdit(item)}>
                <FaEdit className="me-2" /> Edit
              </Button>
              <Button variant="outline-danger" size="sm" className="fw-bold" onClick={() => onDelete(item)}>
                <FaTrashAlt className="me-2" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataGrid;