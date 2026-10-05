const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("ChatGPT Backend Live on Mobile!");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message || "OpenAI Error" });
  }
});

module.exports = app;
