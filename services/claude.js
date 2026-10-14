// const Anthropic = require("@anthropic-ai/sdk");

// const client = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY,
// });

// const askClaude = async (systemPrompt, userPrompt) => {
//   const response = await client.messages.create({
//     model: "claude-sonnet-5",
//     max_tokens: 500,
//     system: systemPrompt,
//     messages: [{ role: "user", content: userPrompt }],
//   });

//   return response.content[0].text;
// };

// module.exports = { askClaude };

// 1
const Anthropic = require("@anthropic-ai/sdk");

let client;
const getClient = () => {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  if (!client)
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
};

const askClaude = async (systemPrompt, userPrompt) => {
  const response = await getClient().messages.create({
    model: "claude-sonnet-5-5",
    max_tokens: 800,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  // Strip accidental ```json fences before the caller JSON.parse()s it
  return response.content[0].text.replace(/```json|```/g, "").trim();
};

module.exports = { askClaude };