import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  ChatContainer,
  MessagesContainer,
  MessageBubble,
  InputContainer,
  MessageInput,
  SendButton,
} from "./Styled";

function ChatScreen({ credentials }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const { state } = useLocation();
  const recipient = state?.recipient;
  const messagesEndRef = useRef(null);

  // Check for recipient
  useEffect(() => {
    if (!recipient) {
      navigate("/recipient");
    }
  }, [recipient, navigate]);

  const loadChatHistory = async () => {
    try {
      const response = await axios.post(
        `https://api.green-api.com/waInstance${credentials.idInstance}/getChatHistory/${credentials.apiTokenInstance}`,
        {
          chatId: `${recipient}@c.us`,
          count: 100,
        }
      );

      const formattedMessages = response.data
        .map((msg) => ({
          text: msg.textMessage || msg.extendedTextMessageData?.text || "",
          outgoing: msg.type === "outgoing",
          timestamp: msg.timestamp * 1000,
        }))
        .reverse();

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error loading chat history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Loading message history
  useEffect(() => {
    if (recipient) {
      loadChatHistory();
    }
  }, [recipient, credentials]);

  // Getting new messages
  useEffect(() => {
    const interval = setInterval(loadChatHistory, 5000);
    return () => clearInterval(interval);
  }, [credentials]);

  // Sending messages
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await axios.post(
        `https://api.green-api.com/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenInstance}`,
        {
          chatId: `${recipient}@c.us`,
          message: newMessage,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          text: newMessage,
          outgoing: true,
          timestamp: Date.now(),
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  // Scroll to the last message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatContainer>
      <MessagesContainer>
        {isLoadingHistory && <div>Loading message history...</div>}

        {messages.map((msg, i) => (
          <MessageBubble key={i} outgoing={msg.outgoing}>
            <div>{msg.text}</div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "#666",
                marginTop: "4px",
                textAlign: msg.outgoing ? "right" : "left",
              }}
            >
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }) || "Unknown time"}
            </div>
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <MessageInput
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatScreen;
