const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/", async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: "Missing question or answer" });
  }

  const prompt = `
You are an AI expert preparing candidates for technical interviews.

Here's a question and its current answer:
Q: ${question}
A: ${answer}

Now, rewrite the answer with:
- More depth and clarity
- Real-world examples
- Structured points

Respond with only the improved answer.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    res.json({ expanded: text });
  } catch (err) {
    console.error("Expansion error:", err);
    res.status(500).json({ error: "Expansion failed" });
  }
});

module.exports = router;
