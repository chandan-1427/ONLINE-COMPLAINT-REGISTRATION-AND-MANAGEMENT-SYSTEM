import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Badge,
  Alert,
  InputGroup,
  Card
} from "react-bootstrap";
import { FaSearch, FaUserShield, FaEdit, FaTrashAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import axios from "axios";

const API = "http://localhost:8000";

const AgentInfo = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`${API}/AgentUsers`);
      setAgents(res.data || []);
    } catch (err) {
      setError("Unable to sync agent data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  useEffect(() => {
    if (!success && !error) return;
    const timer = setTimeout(() => {
      setSuccess("");
      setError("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [success, error]);

  const filteredAgents = useMemo(() => {
    return agents.filter(a =>
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [agents, search]);

  const openEditModal = (agent) => {
    setSelectedAgent(agent);
    setEditData({
      name: agent.name || "",
      email: agent.email || "",
      phone: agent.phone || ""
    });
    setShowEdit(true);
  };

  const handleEditChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    if (!selectedAgent) return;
    try {
      setProcessing(true);
      await axios.put(`${API}/user/${selectedAgent._id}`, editData);
      setAgents(prev => prev.map(a => a._id === selectedAgent._id ? { ...a, ...editData } : a));
      setSuccess("Agent credentials updated.");
      setShowEdit(false);
    } catch {
      setError("Failed to update agent.");
    } finally {
      setProcessing(false);
    }
  };

  const openDeleteModal = (agent) => {
    setSelectedAgent(agent);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (!selectedAgent) return;
    try {
      setProcessing(true);
      await axios.delete(`${API}/OrdinaryUsers/${selectedAgent._id}`);
      setAgents(prev => prev.filter(a => a._id !== selectedAgent._id));
      setSuccess("Agent removed successfully.");
      setShowDelete(false);
    } catch {
      setError("Could not remove agent.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
        <Spinner animation="grow" variant="primary" size="sm" className="mb-3" />
        <span className="text-muted small fw-bold text-uppercase tracking-wider">Syncing Agents...</span>
      </div>
    );
  }

  return (
    <Container fluid className="py-3 bg-light min-vh-100">
      <style>{`
        .agent-card { 
          background: #fff; 
          border: none; 
          border-radius: 12px; 
          padding: 16px; 
          margin-bottom: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .agent-desktop-view { display: block; }
        .agent-mobile-view { display: none; }
        @media (max-width: 768px) {
          .agent-desktop-view { display: none; }
          .agent-mobile-view { display: block; }
          .agent-actions-mobile { display: flex; gap: 8px; margin-top: 15px; border-top: 1px solid #f8f9fa; padding-top: 12px; }
          .agent-actions-mobile button { flex: 1; }
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-4 px-1">
        <div>
          <h5 className="fw-bold mb-0">Agent Management</h5>
          <small className="text-muted">Manage service personnel accounts</small>
        </div>
        <Badge bg="primary" className="px-3 py-2 rounded-pill shadow-sm">
          {agents.length} Active
        </Badge>
      </div>

      {error && <Alert variant="danger" className="small py-2 border-0 shadow-sm mb-3">{error}</Alert>}
      {success && <Alert variant="success" className="small py-2 border-0 shadow-sm mb-3">{success}</Alert>}

      <Card className="border-0 shadow-sm mb-4 rounded-3">
        <Card.Body className="p-2">
          <InputGroup size="sm">
            <InputGroup.Text className="bg-white border-end-0 text-muted ps-3">
              <FaSearch size={14} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search by name or email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border-start-0 shadow-none py-2"
            />
          </InputGroup>
        </Card.Body>
      </Card>

      <div className="agent-desktop-view">
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Table hover className="mb-0 align-middle">
            <thead className="bg-light border-bottom">
              <tr className="text-muted small text-uppercase fw-bold">
                <th className="ps-4 py-3">Agent Name</th>
                <th>Contact info</th>
                <th>Status</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map(agent => (
                <tr key={agent._id}>
                  <td className="ps-4 py-3 fw-bold text-dark">
                    <FaUserShield className="text-primary me-2" size={14} />
                    {agent.name}
                  </td>
                  <td className="text-muted small">
                    <div>{agent.email}</div>
                    <div className="smaller">{agent.phone}</div>
                  </td>
                  <td>
                    <Badge bg="info" className="bg-opacity-10 text-info border border-info border-opacity-25 px-3">
                      Agent
                    </Badge>
                  </td>
                  <td className="text-end pe-4">
                    <Button variant="light" size="sm" className="border rounded-pill px-3 me-2 fw-medium text-secondary" onClick={() => openEditModal(agent)}>
                      <FaEdit className="me-1" /> Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" className="rounded-pill px-3 fw-medium" onClick={() => openDeleteModal(agent)}>
                      <FaTrashAlt className="me-1" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>

      <div className="agent-mobile-view">
        {filteredAgents.map(agent => (
          <div key={agent._id} className="agent-card">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-3">
                  <FaUserShield className="text-primary" size={18} />
                </div>
                <div>
                  <div className="fw-bold text-dark">{agent.name}</div>
                  <Badge bg="info" className="bg-opacity-10 text-info smaller">AGENT</Badge>
                </div>
              </div>
            </div>
            <div className="small text-muted mb-2 d-flex align-items-center">
              <FaEnvelope className="me-2" size={12} /> {agent.email}
            </div>
            <div className="small text-muted d-flex align-items-center">
              <FaPhoneAlt className="me-2" size={12} /> {agent.phone}
            </div>
            <div className="agent-actions-mobile">
              <Button variant="light" size="sm" className="border fw-bold" onClick={() => openEditModal(agent)}>
                <FaEdit className="me-2" /> Edit
              </Button>
              <Button variant="outline-danger" size="sm" className="fw-bold" onClick={() => openDeleteModal(agent)}>
                <FaTrashAlt className="me-2" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showEdit} onHide={() => !processing && setShowEdit(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">Edit Agent Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">Full Name</Form.Label>
              <Form.Control name="name" value={editData.name} onChange={handleEditChange} className="bg-light border-0" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-secondary">Email Address</Form.Label>
              <Form.Control type="email" name="email" value={editData.email} onChange={handleEditChange} className="bg-light border-0" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold text-secondary">Phone Number</Form.Label>
              <Form.Control name="phone" value={editData.phone} onChange={handleEditChange} className="bg-light border-0" />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="light" className="w-100 fw-bold" onClick={() => setShowEdit(false)} disabled={processing}>Cancel</Button>
              <Button variant="primary" className="w-100 fw-bold" onClick={handleUpdate} disabled={processing}>
                {processing ? <Spinner size="sm" /> : "Save Changes"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} onHide={() => !processing && setShowDelete(false)} centered size="sm">
        <Modal.Body className="text-center p-4">
          <div className="text-danger mb-3"><FaTrashAlt size={32} /></div>
          <h6 className="fw-bold">Confirm Deletion</h6>
          <p className="small text-muted mb-4">Remove <strong>{selectedAgent?.name}</strong> from the system?</p>
          <div className="d-grid gap-2">
            <Button variant="danger" size="sm" className="fw-bold" onClick={handleDelete} disabled={processing}>
              {processing ? <Spinner size="sm" /> : "Delete Agent"}
            </Button>
            <Button variant="link" size="sm" className="text-muted text-decoration-none" onClick={() => setShowDelete(false)} disabled={processing}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AgentInfo;