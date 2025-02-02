import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "./Styled";

function RecipientInput({ credentials }) {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState("");

  const handleStartChat = () => {
    if (!recipient) {
      setError("Please enter a phone number");
      return;
    }
    if (!recipient.match(/^\d+$/)) {
      setError("Please enter a valid phone number (digits only)");
      return;
    }
    setError("");

    navigate("/chat", {
      state: { recipient: recipient.replace(/\D/g, "") },
    });
  };

  return (
    <FormContainer>
      <h2>Enter the recipient's phone number</h2>
      <input
        type="tel"
        placeholder="Phone number (for example, 79001234567)"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleStartChat}>Start chat</button>
    </FormContainer>
  );
}

export default RecipientInput;
