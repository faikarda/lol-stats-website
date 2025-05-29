const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5050;

app.use(cors());
app.use(bodyParser.json());

const USERS_FILE = './users.json';
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, '[]');
}

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  let users = JSON.parse(fs.readFileSync(USERS_FILE));

  if (users.some(u => u.username === username || u.email === email)) {
    return res.status(400).json({ message: 'Bu kullanıcı adı veya email zaten kullanılıyor.' });
  }

  // Şifreyi hashle
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, email, password: hashedPassword });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ message: 'Kayıt başarılı!' });
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let users = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Kullanıcı adı veya şifre hatalı!' });
  }

  // Şifreyi karşılaştır
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    res.json({ message: 'Giriş başarılı!' });
  } else {
    res.status(400).json({ message: 'Kullanıcı adı veya şifre hatalı!' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend sunucu çalışıyor: http://localhost:${PORT}`);
});
