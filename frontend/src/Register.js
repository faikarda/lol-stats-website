import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "40px auto",
      background: "#232946",
      padding: 32,
      borderRadius: 14,
      color: "#fff"
    }}>
      <h2>Kayıt Ol</h2>
      {success ? (
        <p>Kayıt başarılı! Şimdi giriş yapabilirsin.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "none" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4, border: "none" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Şifre</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ flex: 1, padding: 8, marginTop: 4, borderRadius: 4, border: "none" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: 8,
                  padding: "4px 12px",
                  borderRadius: 4,
                  border: "none",
                  background: "#888",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 14
                }}
              >
                {showPassword ? "Gizle" : "Göster"}
              </button>
            </div>
          </div>
          <button type="submit" style={{
            width: "100%", padding: 12,
            background: "#4e54c8", color: "#fff",
            border: "none", borderRadius: 8, fontWeight: "bold"
          }}>
            Kayıt Ol
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
