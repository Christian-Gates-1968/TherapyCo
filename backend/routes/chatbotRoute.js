import express from "express";
import { GoogleGenAI } from "@google/genai";

const chatbotRouter = express.Router();
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// List of allowed therapist specialties
const THERAPIST_SPECIALTIES = [
  "Clinical Psychologist",
  "Psychiatrist",
  "Relationship and Marriage Counsellor",
  "Child and Adolescent Counsellor",
  "Trauma and Abuse Counsellor",
  "Anxiety and Depression Specialist",
  "Career Counsellor",
];

// System prompt to ground the model in context
const SYSTEM_PROMPT = `
You are a helpful therapy chatbot for a clinic. When a user asks for a therapist or type of psychologist, you MUST ONLY have a general converstaion at first about mental health and then ask how can you help the user as well as tell them that you can help them by suggesting an appropriate mental health specalist form the list, suggest one (random or context-appropriate) from this list, and never invent new categories or go outside these:
${THERAPIST_SPECIALTIES.join(", ")}
Provide the specialty name exactly as it appears, for linking purposes. Never discuss types not in this list. .
`;

chatbotRouter.post("/chatbot", async (req, res) => {
  try {
    const { message, history } = req.body;
    // Always inject the system prompt as the first turn
    const trueHistory = [
      {
        role: "model",
        parts: [{ text: SYSTEM_PROMPT }],
      },
      ...(history ?? []),
    ];
    const chat = genAI.chats.create({
      model: "gemini-2.5-flash",
      history: trueHistory,
    });
    const response = await chat.sendMessage({ message });
    const updatedHistory = await chat.getHistory();

    // (Optional defense) Validate the response contains an allowed specialty, else set a fallback (currently sends original)
    const found = THERAPIST_SPECIALTIES.find((s) => response.text.includes(s));
    const reply = found
      ? response.text
      : response.text

    res.json({ reply, updatedHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default chatbotRouter;
