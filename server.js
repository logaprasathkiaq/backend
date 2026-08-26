require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// 1. UPDATED CORS SETTINGS (The "A-OK" Signal)
app.use(cors({
  origin: '*', // Allows your CloudFront URL to talk to this backend
  methods: ['GET', 'POST', 'OPTIONS'], // Explicitly allows the Preflight and Send methods
  allowedHeaders: ['Content-Type'] // Allows JSON data to be sent
}));

// 2. MIDDLEWARE ORDER
app.use(express.json()); // Parses the message text you type

// Optional: Explicitly handle the "Preflight" OPTIONS request
app.options('*', cors()); 

// 3. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 4. Data Blueprint (Schema)
const messageSchema = new mongoose.Schema({
  text: String,
  user: { type: String, default: "Anonymous" },
  date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// 5. API Routes
app.get('/messages', async (req, res) => {
  try {
    const allMessages = await Message.find();
    res.json(allMessages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.post('/messages', async (req, res) => {
  try {
    const { text, user } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }
    const newMessage = new Message({ text, user: user || "Anonymous" });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));