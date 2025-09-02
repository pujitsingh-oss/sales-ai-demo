import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handler(event) {
  try {
    const { objection, language } = JSON.parse(event.body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    The merchant raised this objection in ${language}:
    "${objection}"

    Generate a polite, persuasive rebuttal in the same language.
    Keep it concise and conversational.
    `;

    const result = await model.generateContent(prompt);
    return { statusCode: 200, body: JSON.stringify({ text: result.response.text() }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
