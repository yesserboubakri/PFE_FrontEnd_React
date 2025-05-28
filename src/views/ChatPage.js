import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMessages, sendMessage } from '../services/ApiMessages';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";


export default function ChatPage() {
  const { carId, userId, sellerId } = useParams();
  const history = useHistory();

  const storedUser = JSON.parse(localStorage.getItem("user_9antra"));

  useEffect(() => {
    if (!storedUser || storedUser._id !== userId) {
      history.replace("/login");
    }
  }, [storedUser, userId, history]);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const msgs = await getMessages(carId, userId, sellerId);
      setMessages(msgs);

      if (
        msgs.length === 0 &&
        userId.toString() !== sellerId.toString() &&
        !hasSentFirstMessage
      ) {
        setTimeout(async () => {
          await sendMessage({
            carId,
            senderId: userId,
            receiverId: sellerId,
            text: "Bonjour, je suis intéressé par votre voiture.",
          });
          setHasSentFirstMessage(true);
          const refreshed = await getMessages(carId, userId, sellerId);
          setMessages(refreshed);
        }, 500);
      }
      return msgs;
    } catch (err) {
      console.error('Failed to load messages:', err);
      setError('Échec du chargement des messages.');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [carId, userId, sellerId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    setSending(true);
    setError(null);
    try {
      await sendMessage({
        carId,
        senderId: userId,
        receiverId: sellerId,
        text: text.trim(),
      });
      setText('');
      await fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Échec de l\'envoi du message.');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);


  const styles = {
    pageWrapper: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg,rgb(74, 75, 82) 0%,rgb(186, 182, 182) 100%)',
      position: 'relative',
    },
    backgroundOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(229, 231, 242, 0.9) 0%, rgba(209, 39, 39, 0.9) 100%)',
      zIndex: -1,
    },
    chatContainer: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '100px 20px 40px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    chatCard: {
      backgroundColor: '#ffffff',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    header: {
      padding: '24px 32px',
      borderBottom: '1px solid #e5e7eb',
      background: 'linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%)',
      borderRadius: '24px 24px 0 0',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#1f2937',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    headerIcon: {
      width: '32px',
      height: '32px',
      backgroundColor: '#ae0b0b ',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    messagesContainer: {
      flex: 1,
      padding: '24px 32px',
      overflowY: 'auto',
      background: '#f9fafb',
      position: 'relative',
    },
    messagesWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      minHeight: '100%',
    },
    message: {
      maxWidth: '75%',
      padding: '16px 20px',
      borderRadius: '20px',
      fontSize: '15px',
      lineHeight: '1.5',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      animation: 'slideIn 0.3s ease-out',
    },
    messageUser: {
      alignSelf: 'flex-end',
      background: 'linear-gradient(135deg,rgb(214, 16, 16) 0%,rgb(120, 127, 145) 100%)',
      color: 'white',
      borderBottomRightRadius: '6px',
    },
    messageOther: {
      alignSelf: 'flex-start',
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #e5e7eb',
      borderBottomLeftRadius: '6px',
    },
    messageSender: {
      fontSize: '12px',
      fontWeight: '600',
      marginBottom: '4px',
      opacity: 0.9,
    },
    messageTime: {
      fontSize: '11px',
      marginTop: '8px',
      opacity: 0.7,
      textAlign: 'right',
    },
    inputContainer: {
      padding: '24px 32px',
      backgroundColor: 'white',
      borderTop: '1px solid #e5e7eb',
      borderRadius: '0 0 24px 24px',
    },
    inputWrapper: {
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-end',
    },
    textarea: {
      flex: 1,
      minHeight: '52px',
      maxHeight: '120px',
      padding: '16px 20px',
      border: '2px solid #e5e7eb',
      borderRadius: '26px',
      fontSize: '15px',
      fontFamily: 'inherit',
      resize: 'none',
      outline: 'none',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s ease',
      lineHeight: '1.4',
    },
    textareaFocus: {
      borderColor: '#3b82f6',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(195, 11, 11, 0.1)',
    },
    sendButton: {
      minWidth: '120px',
      height: '52px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '26px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: '0 4px 12px rgba(246, 59, 59, 0.3)',
    },
    sendButtonHover: {
      backgroundColor: '#2563eb',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
    },
    sendButtonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
    },
    loadingState: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      color: '#6b7280',
      fontSize: '15px',
    },
    errorMessage: {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      padding: '16px 20px',
      borderRadius: '12px',
      margin: '16px 0',
      border: '1px solid #fecaca',
      fontSize: '14px',
      textAlign: 'center',
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      color: '#6b7280',
      textAlign: 'center',
    },
    emptyStateIcon: {
      width: '64px',
      height: '64px',
      backgroundColor: '#f3f4f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      fontSize: '24px',
    },
  };

  return (
    <>
      <IndexNavbar />

      <div style={styles.pageWrapper} className="chat-page">
        <div style={styles.backgroundOverlay} />

        <div style={styles.chatContainer}>
          <div style={styles.chatCard}>

            <header style={styles.header}>
              <h1 style={styles.headerTitle}>
                <div style={styles.headerIcon}>...</div>
                Conversation avec le vendeur
              </h1>
            </header>

            <main style={styles.messagesContainer}>
              {loading && (
                <div style={styles.loadingState}>
                  <div style={{ marginRight: '12px' }}></div>
                  Chargement des messages...
                </div>
              )}

              {error && (
                <div style={styles.errorMessage}>
                  ⚠️ {error}
                </div>
              )}

              {!loading && messages.length === 0 && (
                <div style={styles.emptyState}>
                  <div style={styles.emptyStateIcon}></div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '500' }}>
                    Aucun message pour l'instant
                  </p>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    Commencez la conversation avec le vendeur
                  </p>
                </div>
              )}

              <div style={styles.messagesWrapper}>
                {messages.map(m => {
                  const isSender = m.sender?._id?.toString() === userId?.toString();
                  const senderName = m.sender?.username || "Utilisateur";

                  return (
                    <div
                      key={m._id}
                      style={{
                        ...styles.message,
                        ...(isSender ? styles.messageUser : styles.messageOther),
                      }}
                    >
                      <div style={styles.messageSender}>
                        {senderName}
                      </div>
                      <div>{m.text}</div>
                      <div style={styles.messageTime}>
                        {new Date(m.createdAt).toLocaleString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </main>


            <footer style={styles.inputContainer}>
              <div style={styles.inputWrapper}>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Tapez votre message..."
                  style={{
                    ...styles.textarea,
                    ...(text.trim() ? styles.textareaFocus : {}),
                  }}
                  disabled={sending}
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!text.trim() || sending}
                  style={{
                    backgroundColor: !text.trim() || sending ? '#feb2b2' : '#e53e3e',
                    color: !text.trim() || sending ? '#f56565' : 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: !text.trim() || sending ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    if (!e.target.disabled) {
                      Object.assign(e.target.style, styles.sendButtonHover);
                    }
                  }}
                  onMouseLeave={e => {
                    if (!e.target.disabled) {
                      Object.assign(e.target.style, styles.sendButton);
                    }
                  }}
                >
                  {sending ? (
                    <>
                      <span style={{
                        display: 'inline-block',
                        animation: 'spin 1s linear infinite',
                        marginRight: '4px'
                      }}></span>
                      Envoi...
                    </>
                  ) : (
                    <>
                      Envoyer
                    </>
                  )}
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <Footer />


    </>
  );
}
