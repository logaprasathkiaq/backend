const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.json({ status: "Online", message: "Backend is running in Docker!" });
});

app.get('/api/data', (req, res) => {
    res.json({ data: ["Jenkins", "Docker", "S3", "CloudFront"] });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
