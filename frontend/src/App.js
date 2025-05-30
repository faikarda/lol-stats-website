import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Champions from './Champions';
import ChampionDetail from './ChampionDetail';
import HomePage from './HomePage';
import Register from './Register';
import Login from './Login';

function App() {
  const [version, setVersion] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/api/versions.json')
      .then(res => res.json())
      .then(versions => setVersion(versions[0]));
  }, []);

  return (
    <Router>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<HomePage version={version} currentUser={currentUser} />} />
        <Route path="/champions" element={<Champions />} />
        <Route path="/champions/:id" element={<ChampionDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
