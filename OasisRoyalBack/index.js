const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'pong' });
});

app.get('/', (req, res) => {
  res.send('Oasis Royal Backend - up');
});

app.listen(port, () => {
  console.log(`Oasis Royal backend listening on http://localhost:${port}`);
});
