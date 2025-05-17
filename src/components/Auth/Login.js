import React, { useState } from "react";
import { loginUser } from "../../Firabase/auth";
import penguinImg from "../../images/penguen-byt.jpg"; // Resim yolu

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

  return (
    <div style={styles.container}>
      <img src={penguinImg} alt="Penguen" style={styles.penguinImage} />
      <h2 style={styles.title}>Giriş Yap</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Giriş
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

export default Login;

// CSS Stilleri

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "90vh",
    boxSizing: "border-box",
    alignItems: "center", // Resmi ve başlığı ortalamak için
  },
  penguinImage: {
    width: "400px",      // Küçük boyut
    height: "auto",
    marginBottom: "1rem",
    borderRadius: "8px",
    objectFit: "cover",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
  },
  input: {
    fontSize: "1.2rem",
    padding: "0.8rem",
    marginBottom: "1.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1.3rem",
    padding: "0.9rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
  },
  error: {
    marginTop: "1rem",
    color: "red",
    textAlign: "center",
  },
};
