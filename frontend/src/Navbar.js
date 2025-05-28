import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      background: "#222",
      padding: "1rem",
      color: "#fff",
      display: "flex",
      gap: "2rem"
    }}>
      <Link to="/" style={{color: "#fff", textDecoration: "none", fontWeight: "bold"}}>Ana Sayfa</Link>
      <Link to="/champions" style={{color: "#fff", textDecoration: "none"}}>Şampiyonlar</Link>
      <Link to="/register" style={{color: "#fff", textDecoration: "none"}}>Kayıt Ol</Link>
      <Link to="/login" style={{color: "#fff", textDecoration: "none"}}>Giriş Yap</Link>
    </nav>
  );
}

export default Navbar;
