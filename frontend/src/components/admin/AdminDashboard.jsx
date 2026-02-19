import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Container, Row, Col, Card, Badge, Dropdown, Spinner, Modal, Button, Alert, Table, Form, InputGroup
} from "react-bootstrap";
import axios from "axios";
import { FaUserPlus, FaClipboardList, FaUsers, FaCheckCircle, FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [complaintsRes, agentsRes] = await Promise.all([
        axios.get("http://localhost:8000/status"),
        axios.get("http://localhost:8000/AgentUsers")
      ]);
      setComplaints(complaintsRes.data);
      setAgents(agentsRes.data);
    } catch (err) {
      setError("Database sync failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const stats = useMemo(() => {
    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'pending').length;
    const completed = complaints.filter(c => c.status === 'completed').length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, pending, completed, rate };
  }, [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            c.comment.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [complaints, searchTerm, filterStatus]);

  const handleAssign = async () => {
    if (!selectedAssignment) return;
    const { agent, complaint } = selectedAssignment;
    try {
      setAssigning(true);
      await axios.post("http://localhost:8000/assignedComplaints", {
        agentId: agent._id,
        complaintId: complaint._id,
        status: complaint.status,
        agentName: agent.name,
      });
      setComplaints((prev) => prev.filter((c) => c._id !== complaint._id));
      setSuccess(`Assigned to ${agent.name}`);
      setShowModal(false);
    } catch (err) {
      setError("Assignment failed.");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <Spinner animation="border" variant="primary" size="sm" />
      <span className="ms-2 small fw-bold text-uppercase text-muted">Syncing...</span>
    </div>
  );

  return (
    <Container fluid className="px-md-4 py-3 bg-white min-vh-100">
      <style>{`
        .admin-stat-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 6px; }
        .compact-table th { font-size: 0.7rem; letter-spacing: 0.05em; color: #64748b; background: #f8fafc; border-top: none; }
        .compact-table td { font-size: 0.85rem; vertical-align: middle; padding: 0.75rem 0.5rem; }
        .search-input { font-size: 0.9rem; border-color: #e2e8f0; }
        .search-input:focus { box-shadow: none; border-color: #3b82f6; }
        .mobile-card-view { display: none; }
        
        @media (max-width: 768px) {
          .desktop-table-view { display: none; }
          .mobile-card-view { display: block; }
          .stat-card-val { font-size: 1.25rem !important; }
        }
      `}</style>

      {/* 1. Header & Quick Stats */}
      <div className="d-flex justify-content-between align-items-end mb-3">
        <div>
          <h6 className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '0.7rem' }}>Overview</h6>
          <h5 className="fw-bold mb-0">System Dashboard</h5>
        </div>
      </div>

      <Row className="g-2 mb-4">
        <Col xs={6} md={3}><StatCard title="Total" value={stats.total} icon={<FaClipboardList />} color="primary" /></Col>
        <Col xs={6} md={3}><StatCard title="Agents" value={agents.length} icon={<FaUsers />} color="info" /></Col>
        <Col xs={6} md={3}><StatCard title="Pending" value={stats.pending} icon={<FaUserPlus />} color="warning" /></Col>
        <Col xs={6} md={3}><StatCard title="Rate" value={`${stats.rate}%`} icon={<FaCheckCircle />} color="success" /></Col>
      </Row>

      {/* 2. Compact Search & Filter */}
      <div className="mb-3">
        <Row className="g-2">
          <Col xs={12} md={8}>
            <InputGroup size="sm">
              <InputGroup.Text className="bg-white border-end-0 text-muted"><FaSearch size={12}/></InputGroup.Text>
              <Form.Control 
                placeholder="Search customers or issues..." 
                className="search-input border-start-0 ps-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={12} md={4}>
            <Form.Select 
              size="sm" 
              className="fw-medium text-secondary"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {error && <Alert variant="danger" className="py-2 small border-0">{error}</Alert>}
      {success && <Alert variant="success" className="py-2 small border-0">{success}</Alert>}

      {/* 3. Main Content: Desktop Table */}
      <div className="desktop-table-view border rounded-3 overflow-hidden">
        <Table hover responsive className="compact-table mb-0">
          <thead>
            <tr className="text-uppercase">
              <th className="ps-3">Customer</th>
              <th>Status</th>
              <th>Issue Details</th>
              <th className="text-end pe-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length > 0 ? filteredComplaints.map((c) => (
              <tr key={c._id}>
                <td className="ps-3">
                  <div className="fw-bold text-dark">{c.name}</div>
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}><FaMapMarkerAlt size={10} /> {c.city}</div>
                </td>
                <td>
                  <Badge bg={c.status === 'completed' ? 'success' : 'warning'} className="fw-medium" style={{ fontSize: '0.7rem' }}>
                    {c.status}
                  </Badge>
                </td>
                <td className="text-muted" style={{ maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.comment}
                </td>
                <td className="text-end pe-3">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm" className="border-0 bg-light fw-bold px-3" style={{ fontSize: '0.75rem' }}>
                      Assign
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end" className="shadow-sm border py-1">
                      {agents.map((a) => (
                        <Dropdown.Item key={a._id} style={{ fontSize: '0.85rem' }} onClick={() => { setSelectedAssignment({ agent: a, complaint: c }); setShowModal(true); }}>
                          {a.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            )) : <tr><td colSpan="4" className="text-center py-4 text-muted small">No records found.</td></tr>}
          </tbody>
        </Table>
      </div>

      {/* 3b. Main Content: Mobile Cards */}
      <div className="mobile-card-view">
        {filteredComplaints.map(c => (
          <Card key={c._id} className="mb-2 border rounded-3 shadow-none">
            <Card.Body className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div className="fw-bold small">{c.name}</div>
                  <div className="text-muted smaller"><FaMapMarkerAlt size={10} /> {c.city}</div>
                </div>
                <Badge bg={c.status === 'completed' ? 'success' : 'warning'} style={{ fontSize: '0.65rem' }}>{c.status}</Badge>
              </div>
              <p className="smaller text-secondary mb-3 line-clamp-2">{c.comment}</p>
              <Button 
                variant="primary" 
                size="sm" 
                className="w-100 fw-bold" 
                style={{ fontSize: '0.75rem' }}
                onClick={() => { setSelectedAssignment({ agent: agents[0], complaint: c }); setShowModal(true); }}
              >
                Assign Agent
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* 4. Assignment Modal */}
      <Modal show={showModal} onHide={() => !assigning && setShowModal(false)} centered size="sm">
        <Modal.Body className="text-center p-4">
          <h6 className="fw-bold mb-2">Confirm Assignment</h6>
          <p className="text-muted smaller mb-4">Assign this ticket to {selectedAssignment?.agent?.name}?</p>
          <div className="d-grid gap-2">
            <Button variant="primary" size="sm" className="fw-bold" onClick={handleAssign} disabled={assigning}>
              {assigning ? "Working..." : "Confirm"}
            </Button>
            <Button variant="link" size="sm" className="text-muted text-decoration-none" onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <Card className="border rounded-3 h-100 shadow-none">
    <Card.Body className="p-3 d-flex align-items-center">
      <div className={`admin-stat-icon bg-${color} bg-opacity-10 text-${color} me-3`}>{icon}</div>
      <div>
        <div className="text-muted fw-bold text-uppercase smaller" style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}>{title}</div>
        <h4 className="fw-bold mb-0 stat-card-val" style={{ fontSize: '1.1rem' }}>{value}</h4>
      </div>
    </Card.Body>
  </Card>
);

export default AdminDashboard;