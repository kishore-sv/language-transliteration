import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

app.use(express.urlencoded({ extended: true }));


// External AI Convert route
app.post("/api/convert/external", async (req, res) => {
  const { text, language } = req.body;

  if (!text || !language) {
    return res.send("Missing input");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
Convert the sentence into VERY casual spoken ${language} written in English letters (Roman script), like WhatsApp chat between friends.

STRICT RULES:
- Output ONLY one sentence
- No explanations
- No breakdown
- No multiple options
- No bullet points
- No formatting
- No quotes
- Just plain text

Example:
Input: I will call you later
Output: ninge amele call madtini

Now convert:
${text}
`;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    res.json({ output });

  } catch (err) {
    console.error(err);
    res.send("Error occurred");
  }
});

// Local Engine Convert route
app.post("/api/convert/local", (req, res) => {
  const { text, language } = req.body;

  if (!text || !language) {
    return res.send("Missing input");
  }

  try {
    const { convert } = require("./model/convert.js");
    const result = convert(text, language);
    
    res.json({
      output: result.output || result
    });

  } catch (err) {
    console.error(err);
    res.send("Error occurred");
  }
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;