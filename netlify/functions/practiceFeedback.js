import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handler(event) {
  try {
    const { scenario, agentResponse, language } = JSON.parse(event.body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Scenario: ${scenario.objection}
    Suggested Response: ${scenario.suggested}
    Agent's Attempt (in ${language}): ${agentResponse}

    Evaluate the agent's response:
    1. Accuracy (0–100%)
    2. Strengths
    3. Improvement tips
    Reply in the same language.
    `;

    const result = await model.generateContent(prompt);
    return { statusCode: 200, body: JSON.stringify({ text: result.response.text() }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
