import Slider from "react-slick";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSlider({ version }) {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    if (!version) return;
    fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
      .then((res) => res.json())
      .then((data) => {
        // Şampiyon listesini al ve rastgele 5 şampiyon seç
        const allChampions = Object.values(data.data);
        const shuffled = allChampions.sort(() => 0.5 - Math.random());
        setChampions(shuffled.slice(0, 6)); // 6 tane rastgele
      });
  }, [version]);

  if (champions.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 800, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div style={{maxWidth: 900, margin: "32px auto"}}>
      <Slider {...settings}>
        {champions.map((champ) => (
          <div key={champ.id} style={{padding: 10}}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`}
              alt={champ.name}
              width="170"
              height="170"
              style={{borderRadius: "50%", display: "block", margin: "0 auto", border: "3px solid #333"}}
            />
            <h3 style={{textAlign: "center"}}>{champ.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlider;
