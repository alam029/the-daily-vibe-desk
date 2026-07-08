const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const GROQ_MODEL = 'openai/gpt-oss-20b';


exports.summarizeArticle = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'No article text provided to summarize' });
    }

    const prompt = `Summarize the following news article in exactly 3 concise bullet points. Only return the bullet points, no preamble:\n\n${text}`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: GROQ_MODEL,
    });

    const summary = response.choices[0]?.message?.content || 'No summary was returned.';

    return res.json({ summary });
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || 'Could not generate a summary right now. Please try again.';
    console.error('[summarizeArticle]', status, message);
    return res.status(status).json({ error: message });
  }
};