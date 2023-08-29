import express from "express";
import cors from "cors";
import json from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
3000
const openai = new OpenAIApi(config);

const app = express();
app.use(json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 1000,
    temperature: 0.8,
    prompt: [
      `${prompt}+ I would appreciate your assistance in providing me with a biblical perspective on prompt. Please respond in the voice and wisdom of Jesus Christ.+ do not use anser word in response
    `
    ],
  });

  res.send(completion.data.choices[0].text);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
