import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Champions() {
  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState(null);

  useEffect(() => {
    // Önce güncel sürümü çek
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => response.json())
      .then(versions => {
        setVersion(versions[0]); // En güncel sürüm
      });
  }, []);

  useEffect(() => {
    if (!version) return;
    fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
      .then(response => response.json())
      .then(data => setChampions(Object.values(data.data)));
  }, [version]);

  if (!version || champions.length === 0) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h2>Şampiyonlar (Patch {version})</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px'}}>
        {champions.map(champ => (
          <Link
            key={champ.id}
            to={`/champions/${champ.id}`}
            style={{textDecoration: 'none', color: 'inherit'}}
          >
            <div style={{
              width: '120px',
              textAlign: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '8px',
              background: '#f9f9f9',
              transition: 'box-shadow 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              cursor: 'pointer'
            }}>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
                alt={champ.name}
                width="80"
                height="80"
                style={{borderRadius: '50%'}}
              />
              <div style={{marginTop: '8px'}}>{champ.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Champions;
