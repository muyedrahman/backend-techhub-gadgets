const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const askClaude = async (systemPrompt, userPrompt) => {
  const response = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 500,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  return response.content[0].text;
};

module.exports = { askClaude };
