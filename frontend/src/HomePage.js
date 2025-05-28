import { Link } from 'react-router-dom';
import HeroSlider from './HeroSlider';

function HomePage({ version }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "20px 0",
      background: "linear-gradient(to bottom, #222 0%, #343759 100%)",
      color: "#fff",
      minHeight: "100vh"
    }}>
      <h1 style={{fontSize: "2.5rem"}}>LoL Build Guide</h1>
      <p style={{maxWidth: "700px", margin: "16px auto", fontSize: "1.2rem"}}>
        Sitemizde League of Legends şampiyonlarının en iyi buildlerini, rünlerini ve rehberlerini bulabilirsin.
        Kayıt olarak favori buildlerini saklayabilir, yeni buildler ekleyebilir ve meta hakkında bilgi edinebilirsin!
      </p>
      {version && <HeroSlider version={version} />}

      <div style={{
        marginTop: 36,
        display: "flex",
        justifyContent: "center",
        gap: "36px"
      }}>
        <Link to="/champions" style={{
          background: "#4e54c8",
          color: "#fff",
          padding: "18px 36px",
          borderRadius: "10px",
          fontWeight: "bold",
          textDecoration: "none",
          fontSize: "1.2rem",
          boxShadow: "0 2px 10px rgba(78,84,200,0.15)",
          transition: "background 0.2s"
        }}>
          Şampiyonlara Göz At
        </Link>
        <Link to="/register" style={{
          background: "#ffbe76",
          color: "#222",
          padding: "18px 36px",
          borderRadius: "10px",
          fontWeight: "bold",
          textDecoration: "none",
          fontSize: "1.2rem",
          boxShadow: "0 2px 10px rgba(255,190,118,0.15)",
          transition: "background 0.2s"
        }}>
          Hemen Kayıt Ol
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
