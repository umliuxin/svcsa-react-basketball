import express from 'express';
import path from 'path';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Example route for interacting with an external API
app.get('/api/data', (req, res) => {
  const externalApiUrl = 'https://api.example.com/data';
  fetch(externalApiUrl)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((error) => res.status(500).json({ error: 'Failed to fetch data' }));
});

// Serve the frontend application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
