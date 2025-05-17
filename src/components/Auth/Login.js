import React, { useState } from "react";
import { loginUser } from "../../Firabase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await loginUser(email, password);
      alert("Giriş başarılı!");
    } catch (err) {
      setError("Email veya şifre yanlış");
    }
  };

  return React.createElement(
    "div",
    { style: { maxWidth: "400px", margin: "auto", padding: "2rem" } },
    React.createElement("h2", null, "Giriş Yap"),
    React.createElement(
      "input",
      {
        type: "email",
        placeholder: "Email",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        style: { display: "block", marginBottom: "1rem", width: "100%" },
      }
    ),
    React.createElement(
      "input",
      {
        type: "password",
        placeholder: "Şifre",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        style: { display: "block", marginBottom: "1rem", width: "100%" },
      }
    ),
    React.createElement(
      "button",
      { onClick: handleLogin, style: { width: "100%" } },
      "Giriş"
    ),
    error && React.createElement("p", { style: { color: "red" } }, error)
  );
}

export default Login;
