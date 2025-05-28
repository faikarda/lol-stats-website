import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ChampionDetail() {
  const { id } = useParams();
  const [champion, setChampion] = useState(null);
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(response => response.json())
      .then(versions => {
        setVersion(versions[0]);
      });
  }, []);

  useEffect(() => {
    if (!version) return;
    fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${id}.json`)
      .then(response => response.json())
      .then(data => {
        const champData = data.data[id];
        setChampion(champData);
      });
  }, [version, id]);

  if (!version || !champion) return <div>Yükleniyor...</div>;

  return (
    <div>
      <h2>{champion.name}</h2>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
        alt={champion.name}
        width="150"
        style={{borderRadius: '10px'}}
      />
      <p style={{marginTop: '12px'}}><b>Başlık:</b> {champion.title}</p>
      <p style={{marginTop: '12px'}}>{champion.lore}</p>
    </div>
  );
}

export default ChampionDetail;
