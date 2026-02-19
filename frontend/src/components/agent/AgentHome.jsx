import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import our new sub-components
import AgentNavbar from './AgentNavbar';
import ComplaintCard from './ComplaintCard';
import Footer from '../common/layout/AuthFooter'; // Adjust path

const AgentHome = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const [complaints, setComplaints] = useState([]);
   const [loading, setLoading] = useState(true);

   // 1. Fetch Data on Mount
   useEffect(() => {
      const initPage = async () => {
         try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            
            if (!storedUser) {
               navigate('/');
               return;
            }

            setUser(storedUser);
            
            // Fetch complaints
            const response = await axios.get(`http://localhost:8000/allcomplaints/${storedUser._id}`);
            setComplaints(response.data);
         } catch (error) {
            console.error("Failed to load agent data", error);
         } finally {
            setLoading(false);
         }
      };

      initPage();
   }, [navigate]);

   // 2. Handle Logout
   const handleLogout = () => {
      localStorage.removeItem('user');
      navigate('/');
   };

   // 3. Helper to update a single item in the list without re-fetching everything
   const updateComplaintLocally = (id, newStatus) => {
      setComplaints(prevList => 
         prevList.map(item => {
            // Check nested _doc structure based on your data
            if (item._doc && item._doc.complaintId === id) {
               return { ...item, _doc: { ...item._doc, status: newStatus } };
            }
            return item;
         })
      );
   };

   if (loading) {
      return (
         <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
         </div>
      );
   }

   return (
      <div className="d-flex flex-column min-vh-100 bg-light">
         {/* Navbar Component */}
         <AgentNavbar 
            userName={user?.name} 
            onLogout={handleLogout} 
         />

         {/* Main Content Area */}
         <Container className="flex-grow-1 py-5">
            <Row className="g-4">
               {complaints && complaints.length > 0 ? (
                  complaints.map((complaint) => (
                     <Col key={complaint._doc?.complaintId || Math.random()} xs={12} md={6} lg={4}>
                        <ComplaintCard 
                           data={complaint} 
                           agentName={user?.name}
                           onStatusUpdate={updateComplaintLocally}
                        />
                     </Col>
                  ))
               ) : (
                  <Col xs={12}>
                     <Alert variant="info" className="text-center">
                        <Alert.Heading>All Caught Up!</Alert.Heading>
                        <p>You have no active complaints assigned to you right now.</p>
                     </Alert>
                  </Col>
               )}
            </Row>
         </Container>

         {/* Footer Component */}
         <Footer />
      </div>
   );
};

export default AgentHome;