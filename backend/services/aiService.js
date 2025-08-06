const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { generatePrompt, generateMoreQuestionsPrompt } = require("../lib/prompts");

const sanitizeQuestions = (questions) => {
  return questions
    .filter((item) => item.q && item.a) // Both question and answer must exist
    .slice(0, 10); // Trim to max 10 for initial generation
};

const generateInterviewQuestions = async (position, description, yoe) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not set in .env");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = generatePrompt(position, description, yoe);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (e) {
      console.error("JSON parsing error:", e);
      fs.writeFileSync("gemini_error_output.json", cleanText); // Save raw for debug
      throw new Error("Invalid JSON format returned by Gemini");
    }

    if (!parsed || !Array.isArray(parsed.questions)) {
      throw new Error("Expected an array of questions");
    }

    const validQuestions = sanitizeQuestions(parsed.questions);
    console.log(`✅ ${validQuestions.length} valid questions parsed.`);

    if (validQuestions.length < 7) {
      fs.writeFileSync("gemini_partial_output.json", JSON.stringify(parsed, null, 2));
      throw new Error("Less than 7 valid questions generated");
    }

    return validQuestions;
  } catch (error) {
    console.error("Error generating interview questions:", error.message);
    throw new Error("Failed to generate questions from AI");
  }
};

const generateMoreQuestions = async (position, description, yoe, existingQuestions, count = 5) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not set in .env");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = generateMoreQuestionsPrompt(position, description, yoe, existingQuestions, count);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (e) {
      console.error("JSON parsing error:", e);
      fs.writeFileSync("gemini_more_questions_error.json", cleanText);
      throw new Error("Invalid JSON format returned by Gemini");
    }

    if (!parsed || !Array.isArray(parsed.questions)) {
      throw new Error("Expected an array of questions");
    }

    const validQuestions = parsed.questions
      .filter((item) => item.q && item.a)
      .slice(0, count);

    console.log(`✅ ${validQuestions.length} additional questions generated.`);

    if (validQuestions.length < 3) {
      fs.writeFileSync("gemini_more_questions_partial.json", JSON.stringify(parsed, null, 2));
      throw new Error("Less than 3 additional questions generated");
    }

    return validQuestions;
  } catch (error) {
    console.error("Error generating more questions:", error.message);
    throw new Error("Failed to generate additional questions from AI");
  }
};

module.exports = { generateInterviewQuestions, generateMoreQuestions };
