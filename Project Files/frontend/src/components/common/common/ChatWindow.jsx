import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';

const ChatWindow = ({ complaintId, name }) => {
   const [messageInput, setMessageInput] = useState('');
   const [messageList, setMessageList] = useState([]);
   const messageWindowRef = useRef(null);

   const fetchMessageList = useCallback(async () => {
      try {
         const response = await axios.get(`http://localhost:8000/api/messages/${complaintId}`);
         setMessageList(response.data);
      } catch (error) {
         console.error('Error fetching messages:', error);
      }
   }, [complaintId]);

   useEffect(() => {
      fetchMessageList();
      // Optional: Set up polling every 5 seconds to get new messages
      const interval = setInterval(fetchMessageList, 5000);
      return () => clearInterval(interval);
   }, [fetchMessageList]);

   useEffect(() => {
      if (messageWindowRef.current) {
         messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
      }
   }, [messageList]);

   const sendMessage = async () => {
      if (!messageInput.trim()) return;
      try {
         const data = {
            name: name,
            message: messageInput,
            complaintId: complaintId
         };
         const response = await axios.post('http://localhost:8000/api/messages', data);
         setMessageList(prev => [...prev, response.data]);
         setMessageInput('');
      } catch (error) {
         console.error('Error sending message:', error);
      }
   };

   return (
      <div className="d-flex flex-column" style={{ height: '450px' }}>
         <style>{`
            .chat-messages-window {
               flex-grow: 1;
               overflow-y: auto;
               padding: 15px;
               background-color: #f8fafc;
               display: flex;
               flex-direction: column;
               gap: 12px;
               scrollbar-width: thin;
            }
            .chat-messages-window::-webkit-scrollbar {
               width: 6px;
            }
            .chat-messages-window::-webkit-scrollbar-thumb {
               background: #e2e8f0;
               border-radius: 10px;
            }
            .msg-bubble {
               max-width: 80%;
               padding: 10px 14px;
               border-radius: 18px;
               font-size: 0.9rem;
               position: relative;
               line-height: 1.4;
            }
            /* Sent by current user */
            .msg-sent {
               align-self: flex-end;
               background-color: #3b82f6;
               color: white;
               border-bottom-right-radius: 4px;
            }
            /* Received from others */
            .msg-received {
               align-self: flex-start;
               background-color: white;
               color: #1e293b;
               border-bottom-left-radius: 4px;
               border: 1px solid #e2e8f0;
            }
            .msg-info {
               font-size: 0.7rem;
               margin-bottom: 4px;
               display: block;
               font-weight: 600;
               color: #64748b;
            }
            .msg-time {
               display: block;
               font-size: 0.65rem;
               margin-top: 4px;
               opacity: 0.7;
               text-align: right;
            }
            .chat-input-area {
               background: white;
               padding: 12px;
               border-top: 1px solid #eef2f6;
            }
         `}</style>

         {/* Header */}
         <div className="px-3 py-2 bg-white border-bottom d-flex align-items-center justify-content-between">
            <span className="fw-bold small text-secondary">Conversation ID: #{complaintId}</span>
            <span className="badge bg-success bg-opacity-10 text-success" style={{fontSize: '10px'}}>Live Support</span>
         </div>

         {/* Messages Area */}
         <div className="chat-messages-window" ref={messageWindowRef}>
            {messageList.length > 0 ? (
               messageList.map((msg) => {
                  const isMe = msg.name === name;
                  return (
                     <div key={msg._id} className={`msg-bubble ${isMe ? 'msg-sent' : 'msg-received shadow-sm'}`}>
                        {!isMe && <span className="msg-info">{msg.name}</span>}
                        <div>{msg.message}</div>
                        <span className="msg-time">
                           {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                     </div>
                  );
               })
            ) : (
               <div className="text-center my-auto text-muted smaller">
                  <p>No messages yet. Start the conversation!</p>
               </div>
            )}
         </div>

         {/* Input Area */}
         <div className="chat-input-area">
            <div className="input-group">
               <textarea 
                  className="form-control shadow-none border-0 bg-light"
                  rows="1"
                  placeholder="Write a reply..." 
                  style={{ resize: 'none', fontSize: '0.9rem' }}
                  value={messageInput} 
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                     }
                  }}
               ></textarea>
               <button 
                  className="btn btn-primary px-3 d-flex align-items-center" 
                  onClick={sendMessage}
                  disabled={!messageInput.trim()}
               >
                  <FaPaperPlane size={14} />
               </button>
            </div>
         </div>
      </div>
   );
}

export default ChatWindow;