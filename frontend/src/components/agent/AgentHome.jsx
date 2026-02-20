import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { FaSyncAlt } from 'react-icons/fa';

import AgentNavbar from './AgentNavbar';
import ComplaintCard from './ComplaintCard';
import Footer from '../common/layout/AuthFooter';

// Import our custom logic
import { useAgentDashboard } from './hooks/useAgentDashboard';

const AgentHome = () => {
  const { state, actions } = useAgentDashboard();

  if (state.loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
        <Spinner animation="grow" variant="primary" size="sm" className="mb-3" />
        <span className="text-muted small fw-bold text-uppercase tracking-wider">
          Syncing Assigned Tasks...
        </span>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <AgentNavbar 
        userName={state.user?.name} 
        onLogout={actions.handleLogout} 
      />

      <Container fluid className="px-md-5 flex-grow-1 py-4">
        
        {/* Page Header Area */}
        <div className="d-flex justify-content-between align-items-end mb-4 px-2">
          <div>
            <h4 className="fw-bold mb-0 text-dark">Assigned Complaints</h4>
            <p className="text-muted small mb-0">Manage and resolve tickets in your queue</p>
          </div>
          
          <Button 
            variant="white" 
            size="sm" 
            className="shadow-sm border rounded-pill px-3 fw-bold text-secondary d-flex align-items-center gap-2"
            onClick={() => actions.fetchData(true)}
            disabled={state.refreshing}
          >
            <FaSyncAlt className={state.refreshing ? 'fa-spin' : ''} /> 
            {state.refreshing ? 'Syncing...' : 'Refresh'}
          </Button>
        </div>

        <Row className="g-4">
          {state.complaints.length > 0 ? (
            state.complaints.map((complaint) => (
              <Col 
                key={complaint._doc?.complaintId || Math.random()} 
                xs={12} sm={6} lg={4} xl={3}
              >
                <ComplaintCard 
                  data={complaint} 
                  agentName={state.user?.name}
                  onStatusUpdate={actions.updateComplaintLocally}
                />
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <div className="text-center py-5 bg-white rounded-4 border shadow-sm mx-2">
                <div className="mb-3 text-muted display-6 opacity-25">📁</div>
                <h5 className="fw-bold">No active complaints</h5>
                <p className="text-muted small">You're all caught up! New tickets will appear here.</p>
                <Button 
                   variant="primary" 
                   size="sm" 
                   className="rounded-pill px-4 mt-2" 
                   onClick={() => actions.fetchData(true)}
                >
                  Check for Updates
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default AgentHome;