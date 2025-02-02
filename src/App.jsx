import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthScreen from "./components/AuthScreen/AuthScreen";
import RecipientInput from "./components/RecipientInput/RecipientInput";
import ChatScreen from "./components/ChatScreen/ChatScreen";

function App() {
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem("green-api-credentials");
    return saved ? JSON.parse(saved) : null;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AuthScreen setCredentials={setCredentials} />}
        />
        <Route
          path="/recipient"
          element={<RecipientInput credentials={credentials} />}
        />
        <Route
          path="/chat"
          element={<ChatScreen credentials={credentials} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
