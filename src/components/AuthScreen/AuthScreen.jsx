import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./Styled";

function AuthScreen({ setCredentials }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ idInstance: "", apiTokenInstance: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.idInstance || !form.apiTokenInstance) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    localStorage.setItem("green-api-credentials", JSON.stringify(form));
    setCredentials(form);
    navigate("/recipient");
  };

  return (
    <AuthForm>
      <h2>Green API Authorization</h2>
      <input
        type="text"
        placeholder="ID Instance"
        value={form.idInstance}
        onChange={(e) => setForm({ ...form, idInstance: e.target.value })}
      />
      <input
        type="text"
        placeholder="API Token Instance"
        value={form.apiTokenInstance}
        onChange={(e) => setForm({ ...form, apiTokenInstance: e.target.value })}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Continue</button>
    </AuthForm>
  );
}

export default AuthScreen;
