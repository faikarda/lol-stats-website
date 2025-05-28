import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Champions from './Champions';
import ChampionDetail from './ChampionDetail';
import HomePage from './HomePage';
import Register from './Register';    // Register'ı ekledik
import Login from './Login';          // Eğer Login de varsa ekle
import { useEffect, useState } from "react";

function App() {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(res => res.json())
      .then(versions => setVersion(versions[0]));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage version={version} />} />
        <Route path="/champions" element={<Champions />} />
        <Route path="/champions/:id" element={<ChampionDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
