import React, { useState, useEffect, useRef, useCallback } from 'react'; // 1. Added useCallback
import axios from 'axios';

const ChatWindow = (props) => {
   const [messageInput, setMessageInput] = useState('');
   const messageWindowRef = useRef(null);
   const [messageList, setMessageList] = useState([]);

   // 2. Wrap the function in useCallback
   const fetchMessageList = useCallback(async () => {
      try {
         const response = await axios.get(`http://localhost:8000/messages/${props.complaintId}`);
         setMessageList(response.data);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   }, [props.complaintId]); // Function only changes if complaintId changes

   // 3. Now it's safe to include fetchMessageList here
   useEffect(() => {
      fetchMessageList();
   }, [fetchMessageList]);

   useEffect(() => {
      scrollToBottom();
   }, [messageList]);

   const sendMessage = async () => {
      if (!messageInput.trim()) return; // Prevent empty messages
      try {
         let data = {
            name: props.name,
            message: messageInput,
            complaintId: props.complaintId
         };
         const response = await axios.post('http://localhost:8000/messages', data);
         
         // Update state locally for instant feedback
         setMessageList(prev => [...prev, response.data]);
         setMessageInput('');
         // fetchMessageList(); // Optional: remove if you're already updating state above
      } catch (error) {
         console.error('Error sending message:', error);
      }
   };

   const scrollToBottom = () => {
      if (messageWindowRef.current) {
         messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
      }
   };

   return (
      <div className="chat-container">
         <h1>Message Box</h1>
         <div className="message-window" ref={messageWindowRef} style={{ height: '400px', overflowY: 'auto' }}>
            {/* Optimization: map from original list, use CSS to handle order if needed */}
            {messageList.slice().reverse().map((msg) => (
               <div className="message" key={msg._id}>
                  <p><strong>{msg.name}:</strong> {msg.message}</p>
                  <p style={{ fontSize: '10px', marginTop: '-15px', color: 'gray' }}>
                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
               </div>
            ))}
         </div>
         <div className="input-container d-flex gap-2 mt-3">
            <textarea 
               className="form-control"
               required 
               placeholder="Type your message..." 
               value={messageInput} 
               onChange={(e) => setMessageInput(e.target.value)}
            ></textarea>
            <button className='btn btn-success' onClick={sendMessage}>Send</button>
         </div>
      </div>
   );
}

export default ChatWindow;