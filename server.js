const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.json({ status: "Online", message: "Backend is running in Docker!" });
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
