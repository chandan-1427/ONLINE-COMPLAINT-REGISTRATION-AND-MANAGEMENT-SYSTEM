import React, { useState } from 'react';
import { Card, Button, Collapse, Badge } from 'react-bootstrap';
import axios from 'axios';
import ChatWindow from '../common/common/ChatWindow'; // Adjust path as needed

const ComplaintCard = ({ data, agentName, onStatusUpdate }) => {
  // We manage the "Chat Open" state locally here, so the parent doesn't need to track it
  const [showChat, setShowChat] = useState(false);
  
  // Destructure for cleaner access. 
  // Note: Handling your specific data structure where some fields are in '_doc'
  const complaintDetails = data._doc || {}; 
  const { complaintId, status } = complaintDetails;
  
  // Handle Status Change locally, then notify parent to refresh list if needed
  const handleStatusChange = async () => {
    try {
      await axios.put(`http://localhost:8000/complaint/${complaintId}`, { status: 'completed' });
      // Call the parent function to update the UI state without a full reload
      if (onStatusUpdate) {
         onStatusUpdate(complaintId, 'completed');
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Card className="shadow-sm h-100" style={{ width: '100%', maxWidth: '22rem' }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
         <span className="fw-bold">#{complaintId}</span>
         <Badge bg={status === 'completed' ? 'success' : 'warning'}>{status}</Badge>
      </Card.Header>
      <Card.Body>
        <Card.Title className="mb-3">{data.name}</Card.Title>
        
        <div className="mb-3 text-secondary" style={{ fontSize: '0.9rem' }}>
          <p className="mb-1"><strong>City:</strong> {data.city}, {data.state}</p>
          <p className="mb-1"><strong>Address:</strong> {data.address}</p>
          <p className="mb-1"><strong>Comment:</strong> {data.comment}</p>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          {status !== 'completed' && (
            <Button 
               variant="success" 
               size="sm" 
               onClick={handleStatusChange}
            >
               Mark Completed
            </Button>
          )}
          
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={() => setShowChat(!showChat)}
            aria-controls={`chat-${complaintId}`}
            aria-expanded={showChat}
          >
            {showChat ? 'Close Chat' : 'Open Chat'}
          </Button>
        </div>

        {/* Chat Collapse Section */}
        <Collapse in={showChat}>
          <div id={`chat-${complaintId}`} className="mt-3">
             <div className="border rounded p-2 bg-light">
                {/* Ensure ChatWindow is robust enough to load only when visible if needed */}
                <ChatWindow 
                   complaintId={complaintId} 
                   name={agentName} 
                />
             </div>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default ComplaintCard;