const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash", contents: message
        });

        const reply = response.text;

        res.json({
            reply: reply
        });

    } catch (error) {

        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            error: "Gemini API Error",
            details: error.message || "Unknown error"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`My Personal AI Bot is running on port ${PORT}`);
});
