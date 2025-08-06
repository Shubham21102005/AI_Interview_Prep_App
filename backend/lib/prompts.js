const generatePrompt = (position, description, yoe) => {
  const prompt = `**Role**: Senior Hiring Manager for ${position} roles  
**Objective**: Generate 10 interview questions with answers for a candidate with ${yoe} years of experience  
**Output Format**: Strict JSON matching this schema:  
{
  "questions": [
    {"q": "question text", "a": "answer text"},
    ... (10 items)
  ]
}

**Job Context**:
- Position: ${position}
- Seniority Level: [Calculate based on YoE:
    • 0-3 yrs = Junior (focus: fundamentals)
    • 4-7 yrs = Mid-level (focus: implementation)
    • 8+ yrs = Senior (focus: architecture/leadership)]
- Job Description: "${description}"

**Technical Requirements**:
1. Question Distribution:
   - 5 technical questions (prioritize skills in job description)
   - 3 behavioral questions (STAR format)
   - 2 situational questions ("how would you..." scenarios)
2. Difficulty Scaling:
   - Junior: Basic definitions, simple scenarios
   - Mid-level: Implementation details, tradeoffs
   - Senior: System design, optimization, failure analysis
3. Job-Specificity:
   - Incorporate exact technologies/tools from description
   - Reference specific responsibilities mentioned

**Answer Requirements**:
- Structure per answer:
  1. Concise response (1 sentence)
  2. Concrete example (1-2 sentences)
  3. Business impact (1 sentence)
- Technical answers: Include implementation specifics
- Behavioral answers: Use full STAR method
- Max 4 sentences per answer

**Critical Constraints**:
1. MUST output valid JSON with EXACTLY 10 {q, a} pairs
2. Answers must be self-contained (no references to external resources)
3. Avoid opinionated phrases ("I believe...")

**Final Output Instructions**:
- Respond with ONLY valid JSON.
- DO NOT include markdown syntax (no \`\`\` or \`\`\`json).
- DO NOT include any text outside the JSON.
- The first character must be "{" and the last character must be "}".
- Response must be parsable by JSON.parse()`;

  return prompt;
};

const generateMoreQuestionsPrompt = (position, description, yoe, existingQuestions, count = 5) => {
  const existingQuestionsText = existingQuestions.map((q, i) => `${i + 1}. ${q.q}`).join('\n');
  
  const prompt = `**Role**: Senior Hiring Manager for ${position} roles  
**Objective**: Generate ${count} ADDITIONAL interview questions with answers for a candidate with ${yoe} years of experience. These questions MUST be different from the existing ones.

**Output Format**: Strict JSON matching this schema:  
{
  "questions": [
    {"q": "question text", "a": "answer text"},
    ... (${count} items)
  ]
}

**Job Context**:
- Position: ${position}
- Seniority Level: [Calculate based on YoE:
    • 0-3 yrs = Junior (focus: fundamentals)
    • 4-7 yrs = Mid-level (focus: implementation)
    • 8+ yrs = Senior (focus: architecture/leadership)]
- Job Description: "${description}"

**EXISTING QUESTIONS (DO NOT REPEAT THESE)**:
${existingQuestionsText}

**Requirements**:
1. Generate ${count} NEW questions that are completely different from the existing ones
2. Focus on different aspects of the role not covered in existing questions
3. Vary the question types (technical, behavioral, situational)
4. Maintain the same quality and depth as original questions
5. Ensure questions are appropriate for ${yoe} years of experience

**Answer Requirements**:
- Structure per answer:
  1. Concise response (1 sentence)
  2. Concrete example (1-2 sentences)
  3. Business impact (1 sentence)
- Technical answers: Include implementation specifics
- Behavioral answers: Use full STAR method
- Max 4 sentences per answer

**Critical Constraints**:
1. MUST output valid JSON with EXACTLY ${count} {q, a} pairs
2. Questions MUST be different from existing ones
3. Answers must be self-contained (no references to external resources)
4. Avoid opinionated phrases ("I believe...")

**Final Output Instructions**:
- Respond with ONLY valid JSON.
- DO NOT include markdown syntax (no \`\`\` or \`\`\`json).
- DO NOT include any text outside the JSON.
- The first character must be "{" and the last character must be "}".
- Response must be parsable by JSON.parse()`;

  return prompt;
};

module.exports = { generatePrompt, generateMoreQuestionsPrompt };
