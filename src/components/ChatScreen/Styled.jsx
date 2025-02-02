import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f0f0f0;
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  background: ${(props) => (props.outgoing ? "#DCF8C6" : "#FFFFFF")};
  align-self: ${(props) => (props.outgoing ? "flex-end" : "flex-start")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  word-break: break-word;
`;

export const InputContainer = styled.div`
  padding: 1rem;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 1rem;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const SendButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: #25d366;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #128c7e;
  }
`;
