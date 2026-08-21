const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(express.json());

// Gemini AI
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Website
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// AI Chat + Web Search
app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        // Personal commands
        const lowerMessage = message.toLowerCase();

        if (
            lowerMessage === "hello bot" ||
            lowerMessage === "হ্যালো বট"
        ) {
            return res.json({
                reply: "হ্যালো! আমি তোমার Personal AI Bot। 😊"
            });
        }

        if (
            lowerMessage === "who are you" ||
            lowerMessage === "তুমি কে"
        ) {
            return res.json({
                reply: "আমি তোমার Personal AI Assistant। 🤖"
            });
        }

        // Gemini + Google Search
        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: message,
            config: {
                tools: [
                    {
                        googleSearch: {}
                    }
                ]
            }
        });

        res.json({
            reply: response.text
        });

    } catch (error) {
        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            error: "AI response failed",
            details: error.message || "Unknown error"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`My Personal AI Bot is running on port ${PORT}`);
});
