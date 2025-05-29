import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ChampionDetail() {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then(res => res.json())
      .then(versions => setVersion(versions[0]));
  }, []);

  useEffect(() => {
    if (!version) return;
    fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${id}.json`)
      .then(res => res.json())
      .then(data => {
        setChampion(data.data[id]);
      });
  }, [version, id]);

  if (!champion) return <div style={{ color: "#fff", textAlign: "center" }}>Yükleniyor...</div>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1a1a2e 0%, #232946 60%, #4e54c8 100%)",
      color: "#fff",
      padding: "48px 0"
    }}>
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        background: "rgba(40,48,88,0.96)",
        borderRadius: 24,
        boxShadow: "0 6px 36px 0 #4e54c880",
        padding: 36
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap"
        }}>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
            alt={champion.name}
            width="210"
            height="360"
            style={{
              borderRadius: 16,
              boxShadow: "0 2px 24px #232946aa"
            }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "2.2rem", marginBottom: 8 }}>{champion.name}</h1>
            <div style={{
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "#f6c90e",
              marginBottom: 12
            }}>{champion.title}</div>
            <div style={{ marginBottom: 18, color: "#c9c9ff" }}>
              {champion.blurb}
            </div>
          </div>
        </div>

        {/* Yetenekler */}
        <h3 style={{ marginTop: 36, color: "#f6c90e" }}>Yetenekler</h3>
        <div style={{
          display: "flex",
          gap: 18,
          marginTop: 10,
          flexWrap: "wrap"
        }}>
          {/* Pasif */}
          <div style={{
            background: "#232946",
            borderRadius: 12,
            padding: 12,
            minWidth: 110,
            textAlign: "center"
          }}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champion.passive.image.full}`}
              alt="Passive"
              width={48}
              style={{ borderRadius: 8, marginBottom: 6, border: "2px solid #4e54c8" }}
            />
            <div style={{ fontWeight: "bold", color: "#f6c90e" }}>Pasif</div>
            <div style={{ fontSize: 12 }}>{champion.passive.name}</div>
          </div>
          {/* Q W E R */}
          {champion.spells.map((spell, idx) => (
            <div key={spell.id} style={{
              background: "#232946",
              borderRadius: 12,
              padding: 12,
              minWidth: 110,
              textAlign: "center"
            }}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                alt={spell.name}
                width={48}
                style={{ borderRadius: 8, marginBottom: 6, border: "2px solid #4e54c8" }}
              />
              <div style={{ fontWeight: "bold", color: "#f6c90e" }}>
                {["Q", "W", "E", "R"][idx]}
              </div>
              <div style={{ fontSize: 12 }}>{spell.name}</div>
            </div>
          ))}
        </div>

        {/* Build/Rün Alanı (şimdilik statik örnek) */}
        <div style={{ marginTop: 36 }}>
          <h3 style={{ color: "#f6c90e" }}>Önerilen Build ve Rünler</h3>
          <div style={{
            background: "#232946",
            borderRadius: 10,
            padding: 18,
            marginTop: 12,
            color: "#fff"
          }}>
            <div>
              <b>Build (Örnek):</b> <span style={{ color: "#f6c90e" }}>Divine Sunderer, Sterak's Gage, Titanic Hydra</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <b>Rün (Örnek):</b> <span style={{ color: "#f6c90e" }}>Conqueror, Triumph, Legend: Tenacity, Last Stand</span>
            </div>
            {/* Sonradan gerçek build/rün bilgisini ekleyebiliriz */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChampionDetail;
