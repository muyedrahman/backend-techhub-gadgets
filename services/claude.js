const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * প্রতিটা AI ফিচার (SEO, description, alt-text) এই একটা ফাংশন দিয়েই
 * Claude কে কল করবে — যাতে model/token limit ইত্যাদি একবারই ঠিক করতে হয়।
 */
const askClaude = async (systemPrompt, userPrompt) => {
  const response = await client.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 500,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  return response.content[0].text;
};

module.exports = { askClaude };
