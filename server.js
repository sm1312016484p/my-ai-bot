const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🤖 My Personal AI Bot is running!");
});

app.post("/chat", (req, res) => {
    const message = req.body.message;

    res.json({
        reply: `তোমার মেসেজ আমি পেয়েছি: ${message}`
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`AI Bot server is running on port ${PORT}`);
});
