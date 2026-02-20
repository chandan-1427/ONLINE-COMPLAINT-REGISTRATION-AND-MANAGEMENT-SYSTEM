import { Card, Button, Badge, Stack } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCommentAlt, FaCheck, FaComments, FaTimes } from 'react-icons/fa';
import ChatWindow from '../common/common/ChatWindow';

// Import local logic and styles
import { useComplaintActions } from './hooks/useComplaintActions';
import styles from './css/ComplaintCard.module.css';

const ComplaintCard = ({ data, agentName, onStatusUpdate }) => {
  const complaintDetails = data._doc || {}; 
  const { complaintId, status } = complaintDetails;

  const { 
    showChat, 
    setShowChat, 
    loading, 
    chatRef, 
    handleStatusChange 
  } = useComplaintActions(complaintId, onStatusUpdate);

  return (
    <>
      <Card className={`${styles.complaintCard} shadow-sm border-0 h-100`}>
        <Card.Body className="p-3 p-sm-4">
          <div className={styles.cardHeaderFlex}>
            <span className={styles.idBadge}>ID #{complaintId}</span>
            <Badge 
              bg={status === 'completed' ? 'success' : 'warning'} 
              className={`${styles.statusBadge} rounded-pill fw-bold bg-opacity-10 text-${status === 'completed' ? 'success' : 'warning'} border`}
            >
              {status}
            </Badge>
          </div>

          <Card.Title className="fw-bold text-dark mb-3" style={{ fontSize: '1.1rem' }}>
            {data.name}
          </Card.Title>
          
          <div className="details-wrapper mb-4">
            <div className={styles.detailItem}>
              <FaMapMarkerAlt className={styles.detailIcon} />
              <div style={{ minWidth: 0 }}>
                <div className="text-dark fw-semibold text-truncate">{data.city}, {data.state}</div>
                <div className="text-muted smaller text-truncate">{data.address}</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <FaCommentAlt className={styles.detailIcon} />
              <div className="text-secondary" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                {data.comment}
              </div>
            </div>
          </div>

          <Stack direction="horizontal" gap={2}>
            {status !== 'completed' && (
              <Button 
                variant="success" 
                size="sm"
                className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                onClick={handleStatusChange}
                disabled={loading}
              >
                <FaCheck size={10} /> Done
              </Button>
            )}
            
            <Button 
              variant="outline-primary" 
              size="sm"
              className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-none"
              onClick={() => setShowChat(true)}
            >
              <FaComments size={14}/> Chat
            </Button>
          </Stack>
        </Card.Body>
      </Card>

      {/* Floating Chat Dialogue Window */}
      {showChat && (
        <div className={styles.floatingChatDialogue} ref={chatRef}>
          <div className={styles.chatDialogueHeader}>
            <div className="d-flex align-items-center gap-2">
              <div className={styles.avatarCircle}>{data.name?.charAt(0)}</div>
              <div>
                <div className="fw-bold" style={{ fontSize: '0.9rem', lineHeight: 1 }}>{data.name}</div>
                <small className="text-muted" style={{ fontSize: '0.7rem' }}>Complaint #{complaintId}</small>
              </div>
            </div>
            <Button variant="link" className="text-muted p-0 shadow-none" onClick={() => setShowChat(false)}>
              <FaTimes />
            </Button>
          </div>
          
          <div className="flex-grow-1 overflow-hidden">
            <ChatWindow 
              complaintId={complaintId} 
              name={agentName} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintCard;