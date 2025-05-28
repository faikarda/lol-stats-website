import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Champions() {
  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => response.json())
      .then(versions => setVersion(versions[0]));
  }, []);

  useEffect(() => {
    if (!version) return;
    fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
      .then(response => response.json())
      .then(data => setChampions(Object.values(data.data)));
  }, [version]);

  if (!version || champions.length === 0) return <div>Yükleniyor...</div>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #232946 0%, #3e497a 60%, #f6c90e 100%)",
      padding: "36px 0"
    }}>
      <h2 style={{ color: "#fff", textAlign: "center", fontSize: "2rem", marginBottom: 28 }}>Şampiyonlar</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '28px',
        padding: "0 20px"
      }}>
        {champions.map(champ => (
          <Link
            key={champ.id}
            to={`/champions/${champ.id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div
              style={{
                width: 160,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 18,
                padding: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.13)",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              className="champion-card"
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                alt={champ.name}
                width="90"
                height="90"
                style={{
                  borderRadius: "50%",
                  marginBottom: 10,
                  border: "3px solid #4e54c8",
                  boxShadow: "0 2px 12px rgba(78,84,200,0.2)"
                }}
              />
              <div style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "#fff",
                letterSpacing: "0.5px"
              }}>{champ.name}</div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`
        .champion-card:hover {
          transform: scale(1.07) translateY(-5px);
          box-shadow: 0 6px 24px 0 #f6c90e, 0 1.5px 10px 0 #4e54c899;
          background: rgba(246,201,14,0.13);
        }
        @media (max-width: 600px) {
          .champion-card {
            width: 100px !important;
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Champions;
