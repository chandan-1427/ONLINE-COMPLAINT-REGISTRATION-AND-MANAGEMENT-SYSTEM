import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCommentAlt, FaComments, FaTimes, FaHistory, FaStamp, FaPenNib } from 'react-icons/fa';
import ChatWindow from '../common/common/ChatWindow';
import { useUserStatus } from './hooks/useUserStatus';

// Import CSS Module
import styles from './css/Status.module.css';

const Status = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { state, actions } = useUserStatus(user?._id);

  if (state.loading) return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="dark" size="sm" />
      <p className="text-muted small mt-2" style={{ fontFamily: 'serif' }}>Consulting Archives...</p>
    </div>
  );

  return (
    <>
      <div className={styles.sectionHeader}>
        <h4 className="fw-bold d-flex align-items-center gap-2" style={{ fontFamily: 'serif' }}>
          <FaStamp className="text-dark" size={20} /> TRACKING ARCHIVES
        </h4>
        <div className={styles.headerLine}></div>
        <p className="text-muted small italic">History of formal statements and correspondence.</p>
      </div>

      <Row className="g-4">
        {state.complaints.length > 0 ? (
          state.complaints.map((c) => (
            <Col key={c._id} xs={12} sm={6} lg={4} xl={3}>
              <Card className={`${styles.stampCard} h-100 border-0`}>
                <Card.Body className="p-4">
                  {/* Status as a Burgundy Postmark */}
                  <div className={`${styles.postmarkStatus} ${c.status === 'completed' ? styles.statusCompleted : styles.statusPending}`}>
                    {c.status}
                  </div>

                  <div className="mb-3">
                    <small className={styles.typewriterId}>REF: {c._id.slice(-6).toUpperCase()}</small>
                  </div>

                  <h6 className={`${styles.formalText} fw-bold mb-3`} style={{ letterSpacing: '0.5px' }}>
                    {c.name.toUpperCase()}
                  </h6>
                  
                  <div className={`${styles.formalText} mb-4`}>
                    <div className="smaller text-muted d-flex gap-2 mb-2">
                      <FaMapMarkerAlt size={10} className="mt-1" /> 
                      <span>{c.city}, {c.state}</span>
                    </div>
                    <div className="smaller text-secondary d-flex gap-2" style={{ fontStyle: 'italic' }}>
                      <FaCommentAlt size={10} className="mt-1" /> 
                      <span className="text-truncate">{c.comment}</span>
                    </div>
                  </div>

                  <Button 
                    variant="dark" 
                    size="sm" 
                    className="w-100 rounded-1 fw-bold d-flex align-items-center justify-content-center gap-2"
                    style={{ fontSize: '0.75rem', letterSpacing: '1px', backgroundColor: '#333' }}
                    onClick={() => actions.setActiveChatId(c)}
                  >
                    <FaComments /> OPEN CORRESPONDENCE
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5 border rounded-1 bg-white opacity-75">
              <FaHistory size={40} className="text-muted mb-3" />
              <p className={styles.formalText}>No prior records found in the dispatch log.</p>
            </div>
          </Col>
        )}
      </Row>

      {/* Floating Dialogue - User Perspective */}
      {state.activeChatId && (
        <div className={styles.floatingChatDialogue}>
          <div className={`${styles.chatDialogueHeader} d-flex align-items-center justify-content-between`}>
            <div className="d-flex align-items-center gap-2">
              <FaPenNib size={14} />
              <span className="small fw-bold">OFFICIAL INQUIRY</span>
            </div>
            <Button variant="link" className="text-white p-0 shadow-none" onClick={() => actions.setActiveChatId(null)}>
              <FaTimes />
            </Button>
          </div>
          
          <div className="p-2 border-bottom bg-light">
             <small className={styles.typewriterId} style={{ fontSize: '0.65rem' }}>
               Subject ID: {state.activeChatId._id}
             </small>
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <ChatWindow 
              complaintId={state.activeChatId._id} 
              name={user?.name} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Status;