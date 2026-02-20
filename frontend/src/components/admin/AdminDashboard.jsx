import React, { useEffect } from "react";
import {
  Container, Row, Col, Card, Badge, Dropdown, Spinner, Modal, Button, Alert, Table, Form, InputGroup
} from "react-bootstrap";
import { FaUserPlus, FaClipboardList, FaUsers, FaCheckCircle, FaSearch, FaMapMarkerAlt } from "react-icons/fa";

// Reusable UI Block (Can be moved to common if needed)
import StatCard from "./common/StatCard";

// Logic Hook
import { useDashboard } from "./hooks/useDashboard";

const AdminDashboard = () => {
  const { state, actions } = useDashboard();

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => actions.setSuccess(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [state.success, actions]);

  if (state.loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <Spinner animation="border" variant="primary" size="sm" />
      <span className="ms-2 small fw-bold text-uppercase text-muted">Syncing Dashboard...</span>
    </div>
  );

  return (
    <Container fluid className="px-md-4 py-3 bg-white min-vh-100">
      <style>{`
        .admin-stat-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 6px; }
        .compact-table th { font-size: 0.7rem; letter-spacing: 0.05em; color: #64748b; background: #f8fafc; }
        .compact-table td { font-size: 0.85rem; vertical-align: middle; padding: 0.75rem 0.5rem; }
        @media (max-width: 768px) {
          .desktop-view { display: none; }
          .mobile-view { display: block; }
        }
        @media (min-width: 769px) {
          .mobile-view { display: none; }
        }
      `}</style>

      {/* 1. Header & Quick Stats */}
      <div className="mb-3">
        <h6 className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.7rem' }}>System Overview</h6>
        <h5 className="fw-bold mb-0">Admin Dashboard</h5>
      </div>

      <Row className="g-2 mb-4">
        <Col xs={6} md={3}><StatCard title="Total" value={state.stats.total} icon={<FaClipboardList />} color="primary" /></Col>
        <Col xs={6} md={3}><StatCard title="Agents" value={state.agents.length} icon={<FaUsers />} color="info" /></Col>
        <Col xs={6} md={3}><StatCard title="Pending" value={state.stats.pending} icon={<FaUserPlus />} color="warning" /></Col>
        <Col xs={6} md={3}><StatCard title="Rate" value={`${state.stats.rate}%`} icon={<FaCheckCircle />} color="success" /></Col>
      </Row>

      {/* 2. Compact Search & Filter */}
      <div className="mb-3">
        <Row className="g-2">
          <Col xs={12} md={8}>
            <InputGroup size="sm">
              <InputGroup.Text className="bg-white border-end-0 text-muted"><FaSearch size={12}/></InputGroup.Text>
              <Form.Control 
                placeholder="Search customers or issues..." 
                className="border-start-0 ps-0 shadow-none"
                value={state.searchTerm}
                onChange={(e) => actions.setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={4}>
            <Form.Select 
              size="sm" 
              className="fw-medium text-secondary shadow-none"
              value={state.filterStatus}
              onChange={(e) => actions.setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {state.error && <Alert variant="danger" className="py-2 small border-0 shadow-sm">{state.error}</Alert>}
      {state.success && <Alert variant="success" className="py-2 small border-0 shadow-sm">{state.success}</Alert>}

      {/* 3. Main Content: Desktop Table */}
      <div className="desktop-view border rounded-3 overflow-hidden shadow-sm">
        <Table hover responsive className="compact-table mb-0">
          <thead>
            <tr className="text-uppercase">
              <th className="ps-3 py-2">Customer</th>
              <th>Status</th>
              <th>Issue Details</th>
              <th className="text-end pe-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.complaints.length > 0 ? state.complaints.map((c) => (
              <tr key={c._id}>
                <td className="ps-3">
                  <div className="fw-bold text-dark">{c.name}</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}><FaMapMarkerAlt size={10} /> {c.city}</div>
                </td>
                <td>
                  <Badge bg={c.status === 'completed' ? 'success' : 'warning'} className="fw-medium px-2 py-1" style={{ fontSize: '0.7rem' }}>
                    {c.status}
                  </Badge>
                </td>
                <td className="text-muted text-truncate" style={{ maxWidth: '250px' }}>
                  {c.comment}
                </td>
                <td className="text-end pe-3">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm" className="border-0 bg-light fw-bold px-3" style={{ fontSize: '0.75rem' }}>
                      Assign
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" className="shadow-sm border py-1">
                      {state.agents.map((a) => (
                        <Dropdown.Item key={a._id} style={{ fontSize: '0.85rem' }} onClick={() => { actions.setSelectedAssignment({ agent: a, complaint: c }); actions.setShowModal(true); }}>
                          {a.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            )) : <tr><td colSpan="4" className="text-center py-5 text-muted small">No tickets match your filter.</td></tr>}
          </tbody>
        </Table>
      </div>

      {/* 3b. Main Content: Mobile Cards */}
      <div className="mobile-view">
        {state.complaints.map(c => (
          <Card key={c._id} className="mb-2 border rounded-3 shadow-none">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div className="fw-bold small">{c.name}</div>
                  <div className="text-muted smaller"><FaMapMarkerAlt size={10} /> {c.city}</div>
                </div>
                <Badge bg={c.status === 'completed' ? 'success' : 'warning'} style={{ fontSize: '0.65rem' }}>{c.status}</Badge>
              </div>
              <p className="smaller text-secondary mb-3 text-truncate">{c.comment}</p>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="primary" size="sm" className="w-100 fw-bold shadow-none" style={{ fontSize: '0.75rem' }}>
                  Assign Agent
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                   {state.agents.map(a => (
                     <Dropdown.Item key={a._id} onClick={() => { actions.setSelectedAssignment({ agent: a, complaint: c }); actions.setShowModal(true); }}>
                       {a.name}
                     </Dropdown.Item>
                   ))}
                </Dropdown.Menu>
              </Dropdown>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* 4. Assignment Modal */}
      <Modal show={state.showModal} onHide={() => !state.processing && actions.setShowModal(false)} centered size="sm">
        <Modal.Body className="text-center p-4">
          <h6 className="fw-bold mb-2">Confirm Assignment</h6>
          <p className="text-muted smaller mb-4">Assign this ticket to {state.selectedAssignment?.agent?.name}?</p>
          <div className="d-grid gap-2">
            <Button variant="primary" size="sm" className="fw-bold shadow-none" onClick={actions.handleAssign} disabled={state.processing}>
              {state.processing ? <Spinner size="sm" /> : "Confirm"}
            </Button>
            <Button variant="link" size="sm" className="text-muted text-decoration-none" onClick={() => actions.setShowModal(false)}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;