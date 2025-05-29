import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentUser(username);
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı!");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: `
        linear-gradient(135deg, #232946cc 50%, #343759cc 100%),
        url('https://wallpapers.com/images/high/stunning-league-of-legends-logo-942s55eoux26omnq.webp')
      `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: 400,
        background: "rgba(40,48,88,0.96)",
        borderRadius: 18,
        boxShadow: "0 6px 36px 0 #4e54c880",
        padding: 36,
        color: "#fff"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 24, color: "#f6c90e" }}>Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 8,
                border: "1px solid #4e54c8",
                background: "#232946",
                color: "#fff",
                outline: "none"
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", marginBottom: 6 }}>Şifre</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #4e54c8",
                  background: "#232946",
                  color: "#fff",
                  outline: "none"
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: 8,
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "none",
                  background: "#f6c90e",
                  color: "#232946",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                {showPassword ? "Gizle" : "Göster"}
              </button>
            </div>
          </div>
          <button type="submit" style={{
            width: "100%",
            padding: 14,
            background: "linear-gradient(90deg,#4e54c8,#8f94fb)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontWeight: "bold",
            fontSize: "1.1rem",
            marginTop: 8,
            transition: "background 0.2s, transform 0.2s",
            boxShadow: "0 2px 12px rgba(78,84,200,0.18)",
            cursor: "pointer"
          }}>
            Giriş Yap
          </button>
          {error && <div style={{ color: "#f55", marginTop: 16, textAlign: "center" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
