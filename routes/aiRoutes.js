const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const { askClaude } = require("../services/claude");

// POST /api/ai/generate-seo
router.post("/generate-seo", verifyAdmin, async (req, res) => {
  try {
    const { name, brand, type, price, shortDescription } = req.body;

    if (!name || !brand) {
      return res
        .status(400)
        .json({ message: "Product name and brand are required" });
    }

    const systemPrompt =
      "You are an SEO expert for an e-commerce gadget catalog website called TechHub. " +
      "Given product details, generate SEO metadata. " +
      "Respond ONLY with valid JSON in this exact shape, no extra text: " +
      '{"seoTitle": "string under 60 characters", "metaDescription": "string under 155 characters", "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]}';

    const userPrompt = `Product: ${name}\nBrand: ${brand}\nType: ${type || "N/A"}\nPrice: $${price || "N/A"}\nDescription: ${shortDescription || "N/A"}`;

    const raw = await askClaude(systemPrompt, userPrompt);
    const parsed = JSON.parse(raw);

    res.json(parsed);
  } catch (err) {
    console.error("SEO generation error:", err.message);
    res.status(500).json({ message: "Failed to generate SEO content" });
  }
});

// POST /api/ai/generate-description
router.post("/generate-description", verifyAdmin, async (req, res) => {
  try {
    const { name, brand, type, features } = req.body;

    if (!name || !brand) {
      return res
        .status(400)
        .json({ message: "Product name and brand are required" });
    }

    const systemPrompt =
      "You are a product copywriter for an e-commerce gadget catalog website called TechHub. " +
      "Write clear, factual, engaging product descriptions. Do not invent specifications " +
      "that were not provided. Respond ONLY with valid JSON in this exact shape, no extra text: " +
      '{"shortDescription": "one sentence, under 120 characters", "fullDescription": "2-3 paragraphs, plain text"}';

    const userPrompt = `Product: ${name}\nBrand: ${brand}\nType: ${type || "N/A"}\nKnown features: ${features || "N/A"}`;

    const raw = await askClaude(systemPrompt, userPrompt);
    const parsed = JSON.parse(raw);

    res.json(parsed);
  } catch (err) {
    console.error("Description generation error:", err.message);
    res.status(500).json({ message: "Failed to generate description" });
  }
});

// POST /api/ai/generate-alt-text
router.post("/generate-alt-text", verifyAdmin, async (req, res) => {
  try {
    const { name, brand, type } = req.body;

    if (!name || !brand) {
      return res
        .status(400)
        .json({ message: "Product name and brand are required" });
    }

    const systemPrompt =
      "You are an accessibility and SEO expert. Given a product's name, brand, and type, " +
      "write one concise, descriptive image alt text (under 125 characters) suitable for a " +
      "product photo. Respond ONLY with valid JSON in this exact shape, no extra text: " +
      '{"altText": "string"}';

    const userPrompt = `Product: ${name}\nBrand: ${brand}\nType: ${type || "N/A"}`;

    const raw = await askClaude(systemPrompt, userPrompt);
    const parsed = JSON.parse(raw);

    res.json(parsed);
  } catch (err) {
    console.error("Alt text generation error:", err.message);
    res.status(500).json({ message: "Failed to generate alt text" });
  }
});

module.exports = router;
