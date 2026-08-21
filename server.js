const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());

// Gemini AI
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// index.html দেখাবে
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// AI Chat
app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message
        });

        res.json({
            reply: response.text
        });

    } catch (error) {
        console.error("AI Error:", error);

        res.status(500).json({
            error: "AI response failed"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`My Personal AI Bot is running on port ${PORT}`);
});
